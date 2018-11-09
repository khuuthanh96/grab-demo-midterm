const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE_URL, {useMongoClient: true})
.catch(err => {
    console.log(err);
    process.exit(1)
});
