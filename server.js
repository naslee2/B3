var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 
var path = require('path');

app.use(express.static( __dirname + '/angular/dist' ));

var MovieSchema = new mongoose.Schema({
    title: {type: String, required: [true, 'Movie Title must be 3 or more characters!'], minlength: 3},
    review:
        [{
        reviewer: {type: String, required: [true, 'Reviewer name must be 3 or more characters!']},
        stars: { type: Number, required: true},
        review: {type: String, required: [true, 'Movie Review must be 3 or more characters!']}
    }]
}, {timestamps: true });

mongoose.model('Movie', MovieSchema);

var Movie = mongoose.model('Movie');

app.use(bodyParser.json());

app.use(express.static( __dirname + '/angular/dist' ));

mongoose.connect('mongodb://localhost/movie');

mongoose.Promise = global.Promise;

app.post('/new', function(request, response){ //ADD new movie and review
    var add = new Movie(
        {
        title: request.body.title,
        review: {
            reviewer: request.body.reviewer,
            stars: request.body.star,
            review: request.body.review
            }
        })
    console.log('add',add)
    add.save(function(err){
            if(err){
                console.log(err)
                response.json({message: "Error", error: err});
            }
            else{
                response.json({message: "success!", data: add});
            }
        })
    })

app.get('/getMovies', function(request, response) { //view all movies
    Movie.find({}, null, {sort: 'type'}, function(err, task) {
    if(err) {
        console.log("returned error", err)
        response.json({message: "Error", error: err})
    }
    else {
        response.json({message: "success", data: task})
        }
    })
}) 

app.delete('/deleteMovie/:id', function(request, response) { //delete movie
    Movie.remove({_id: request.params.id}, function(err){
        if(err){
            response.json({message: "Error", error: err});
        }
        else{
            response.json({message: "success"});
        }
    })
})

app.put("/newReview/:id", function(request, response){ //add review
    console.log(request.params.id)
    Movie.findOne({_id: request.params.id}, function(err, data){
        data.review.push({reviewer: request.body.reviewer, stars: request.body.star, review: request.body.review})
    data.save(function(err){
        if(err){
            console.log("error update")
            response.json({message: "Error", error: err});
        }
        else{
            console.log("success update")
            response.json({message: "success", data: data});
        }
    })
})
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./angular/dist/index.html"))
  });

app.listen(8000, function() {
    console.log("listening on port 8000");
})