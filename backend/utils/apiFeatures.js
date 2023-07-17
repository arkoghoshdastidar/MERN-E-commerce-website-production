class ApiFeatures {
    // query is the mongoDB query to be executed. ex:- model.find({});
    // queryStr contains all the keywords in the req query;
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = (this.queryStr.keyword) ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        let newQueryStr = { ...this.queryStr };
        // removing some properties which are not useful for the filter method
        const removeProps = ["keyword", "page"];
        removeProps.forEach(key => delete newQueryStr[key]);
        // filtering on the basis of price, rating and category
        newQueryStr = JSON.stringify(newQueryStr);
        newQueryStr = newQueryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        newQueryStr = JSON.parse(newQueryStr);
        this.query = this.query.find(newQueryStr);
        return this;
    }

    pagination(resultPerPage) {
        const pageNumber = Number(this.queryStr.page) || 1;
        const skipProducts = resultPerPage * (pageNumber - 1);
        this.query = this.query.limit(resultPerPage).skip(skipProducts);
        return this;
    }
}

module.exports = ApiFeatures;