export async function postImageUpload(req, res) {
    if (!req.newFileName) {
        return res.status(500).json({
            status: 'error',
            msg: 'Serverio klaida, nepavyko išsaugoti failo',
        });
    }

    return res.status(201).json({
        status: 'success',
        msg: '/img/movies/' + req.newFileName,
    });
}