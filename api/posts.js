import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Helper function to read and write the db.json file
const readData = () => {
    const data = readFileSync(join(process.cwd(), 'db.json'), 'utf8');
    return JSON.parse(data);
};

const writeData = (data) => {
    writeFileSync(join(process.cwd(), 'db.json'), JSON.stringify(data, null, 2));
};

export default function handler(req, res) {
    const { method } = req;
    const data = readData(); // Read the data from db.json

    // Get the ID from query if present (for GET, PUT, DELETE)
    const { id } = req.query;

    switch (method) {
        case 'GET':
            // If there's an ID in the query, return a single post by ID
            if (id) {
                const post = data.posts.find(p => p.id === id);
                if (post) {
                    return res.status(200).json(post);
                } else {
                    return res.status(404).json({ error: 'Post not found' });
                }
            }
            // Otherwise, return all posts
            return res.status(200).json(data.posts);

        case 'POST':
            // Handle POST request: Add a new post
            const newPost = req.body;
            newPost.id = String(data.posts.length + 1); // Auto-generate ID
            data.posts.push(newPost);
            writeData(data); // Save to db.json
            return res.status(201).json(newPost);

        case 'PUT':
            // Handle PUT request: Update an existing post by ID
            if (!id) {
                return res.status(400).json({ error: 'ID is required for update' });
            }
            const postIndex = data.posts.findIndex(p => p.id === id);
            if (postIndex === -1) {
                return res.status(404).json({ error: 'Post not found' });
            }
            data.posts[postIndex] = { ...data.posts[postIndex], ...req.body };
            writeData(data); // Save to db.json
            return res.status(200).json(data.posts[postIndex]);

        case 'DELETE':
            // Handle DELETE request: Delete a post by ID
            if (!id) {
                return res.status(400).json({ error: 'ID is required for deletion' });
            }
            const postIndexToDelete = data.posts.findIndex(p => p.id === id);
            if (postIndexToDelete === -1) {
                return res.status(404).json({ error: 'Post not found' });
            }
            const deletedPost = data.posts.splice(postIndexToDelete, 1);
            writeData(data); // Save to db.json
            return res.status(200).json(deletedPost);

        default:
            res.status(405).json({ error: `Method ${method} Not Allowed` });
            break;
    }
}
