const AppError = require('./../utils/appError');

class APIfeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    let queryStr = { ...this.queryString };
    const excludeFields = ['sort', 'fields', 'limit', 'page'];
    excludeFields.forEach((fl) => delete queryStr[fl]);

    queryStr = JSON.stringify(queryStr);
    queryStr = queryStr.replace(/\b(gte|lte|lt|gt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else this.query = this.query.sort('price');
    return this;
  }
  limiting() {
    if (this.queryString.fields) {
      //to prevent expose user password to client sile [fileds=password]
      if (this.queryString.fields.split(',').includes('password'))
        throw new AppError('invalid requrest', 400);

      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
  paginate() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIfeature;
