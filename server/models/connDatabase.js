const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//process.env.DATABASE_URL
mongoose.connect(process.env.DATABASE_LOCAL_URL, {useMongoClient: true})
.catch(err => {
    console.log(err);
    process.exit(1)
});
