//引入mongoose
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/questionnaire", { useNewUrlParser: true,  useUnifiedTopology: true})
    .then(console.log('mongodb connected'))
    .catch(err => {
        console.log(err);
    })