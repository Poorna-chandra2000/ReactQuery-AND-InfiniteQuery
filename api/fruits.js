// Assuming the fruit data is in db.json as an array of fruits
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

    switch (method) {
        case 'GET':
            // Handle GET request: Pagination support for /api/fruits
            if (req.query._page) {
                const page = parseInt(req.query._page, 10);
                const perPage = parseInt(req.query._per_page, 10);

                // Calculate pagination
                const startIndex = (page - 1) * perPage;
                const endIndex = page * perPage;
                const paginatedFruits = data.fruits.slice(startIndex, endIndex);

                // Send paginated data
                return res.status(200).json(paginatedFruits);
            }

            // Return all fruits if no pagination is requested
            return res.status(200).json(data.fruits);

        default:
            res.status(405).json({ error: `Method ${method} Not Allowed` });
            break;
    }
}
