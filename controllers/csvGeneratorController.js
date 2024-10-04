const axios = require('axios');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');



const getDataFromApi = async () => {
    try {
        const [usersApiResponse, postsApiResponse, commentsApiResponse] = await Promise.all([
            axios.get('https://jsonplaceholder.typicode.com/users'),
            axios.get('https://jsonplaceholder.typicode.com/posts'),
            axios.get('https://jsonplaceholder.typicode.com/comments')
        ])

        const users = usersApiResponse.data;
        const posts = postsApiResponse.data;
        const comments = commentsApiResponse.data;

        const combinedData = users.map((ele, idx) => {
            return {
                id: ele.id,
                name: ele.name,
                title: posts[idx].title,
                body: comments[idx].body
            }
        });
        console.log(combinedData);
        return combinedData;
    } catch (error) {
        throw error
    }
}


module.exports.controllerFunction = async (req, res) => {
    try {
        const combinedData = await getDataFromApi();

        const timestamp = Date.now();
        const path_location = `../csv_data/csv_${timestamp}.csv`
        const csvWriter = createCsvWriter({
            path: path.join(__dirname, path_location),
            header: [
                { id: 'id', title: 'ID' },
                { id: 'name', title: 'Name' },
                { id: 'title', title: 'Title' },
                { id: 'body', title: 'Body' }
            ]
        });

        await csvWriter.writeRecords(combinedData);

        return res.status(200).send({ msg: "CSV file created and inserted successfully", success: true, file_path: `csv-generator/csv_data/csv_${timestamp}` })

    } catch (error) {
        console.log(error);
        return res.status(500).send({ msg: error.message, success: false });
    }
}



