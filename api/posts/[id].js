import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Helper functions to read and write the db.json file
const readData = () => {
    const data = readFileSync(join(process.cwd(), 'db.json'), 'utf8');
    return JSON.parse(data);
};

const writeData = (data) => {
    writeFileSync(join(process.cwd(), 'db.json'), JSON.stringify(data, null, 2));
};

export default function handler(req, res) {
    const { method } = req;
    const { id } = req.query;  // Dynamic 'id' from URL (e.g., /api/posts/[id])
    const data = readData(); // Read data from db.json

    switch (method) {
        case 'GET':
            // Handle GET request: Fetch post by ID
            const post = data.posts.find(p => p.id === id);
            if (post) {
                return res.status(200).json(post);
            } else {
                return res.status(404).json({ error: 'Post not found' });
            }

        case 'PUT':
            // Handle PUT request: Update post by ID
            const postIndex = data.posts.findIndex(p => p.id === id);
            if (postIndex === -1) {
                return res.status(404).json({ error: 'Post not found' });
            }
            data.posts[postIndex] = { ...data.posts[postIndex], ...req.body };
            writeData(data);  // Save to db.json
            return res.status(200).json(data.posts[postIndex]);

        case 'DELETE':
            // Handle DELETE request: Delete post by ID
            const deleteIndex = data.posts.findIndex(p => p.id === id);
            if (deleteIndex === -1) {
                return res.status(404).json({ error: 'Post not found' });
            }
            const deletedPost = data.posts.splice(deleteIndex, 1);
            writeData(data);  // Save to db.json
            return res.status(200).json(deletedPost);

        default:
            res.status(405).json({ error: `Method ${method} Not Allowed` });
            break;
    }
}
