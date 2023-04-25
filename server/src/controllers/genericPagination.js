/* GET listing. */
// router.get('/', auth, admin, async (req, res) => {
const genericPagination = async (req, res, Model) => {

    function buildSortObject(sortBy, sortDesc) {
        if (sortBy.length === 0) {
            return { _id: -1 }
        }
        const sortObject = {};
        for (let i = 0; i < sortBy.length; i++) {
            // sortObject[sortBy[i]] = sortDesc[i] === 'true' ? -1 : 1;
            sortObject[sortBy[i]] = sortDesc[i] ? -1 : 1;
        }
        return sortObject;
    }


    // console.log(req.query)
    function getSkip(page, itemsPerPage) {
        return (parseInt(page) * parseInt(itemsPerPage)) - parseInt(itemsPerPage);
    }
    // console.log(req.query)
    const skip = getSkip(req.query.page, req.query.itemsPerPage)


    const sortBy = req.query.sortBy ? JSON.parse(req.query.sortBy) : [];
    const sortDesc = req.query.sortDesc ? JSON.parse(req.query.sortDesc).map(value => value === 'true' || value === true) : [];
    const sortOrder = buildSortObject(sortBy, sortDesc);
    // console.log(sortBy)
    // console.log(sortDesc)
    // console.log(sortOrder)
    try {

        // const find = "_hol"
        let search = false
        let fields = false
        if (req.query.search && req.query.fields) {
            search = req.query.search
            fields = JSON.parse(req.query.fields)
        }
        let templates, totalFilteredRows, totalRows
        if (search && fields) {
            templates = await Model.find().sort(sortOrder).simpleSearch({ by: fields, search: search }).limit(req.query.itemsPerPage).skip(skip)
            totalFilteredRows = await Model.find().simpleSearch({ by: fields, search: search }).count()
        } else {
            templates = await Model.find().sort(sortOrder).limit(req.query.itemsPerPage).skip(skip)
            totalFilteredRows = await Model.find().count()
        }
        totalRows = await Model.find().count()
        // console.log(totalFilteredRows, templates)
        // console.log(totalFilteredRows, totalRows)
        function getPages(totalFilteredRows, itemsPerPage) {
            let n = 0;
            if ((parseInt(totalFilteredRows) % parseInt(itemsPerPage)) != 0) {
                n = 1;
            }
            return parseInt((parseInt(totalFilteredRows) / parseInt(itemsPerPage)) + n);
        }
        const response = {
            collection: templates,
            itemsPerPage: parseInt(req.query.itemsPerPage),
            page: parseInt(req.query.page),
            pages: getPages(totalFilteredRows, req.query.itemsPerPage),
            totalFilteredRows: totalFilteredRows,
            totalRows: totalRows
        }
        // console.log(response)
        return res.status(200).json(response);

    } catch (error) {
        return res.status(400).json({
            mensaje: error.message,
            // error
        })
    }

};
module.exports = genericPagination;
