const express = require('express')
const mongoose = require('mongoose');
const shortid = require('shortid')
//let helloWorldFunction = (req, res) => res.send ('Hello world! this is shiv')
//let printExample = (req, res) => res.send ('print example guys')

//importing the model here

const BlogModel = mongoose.model('Blog')

/*let testRoute = (req,res) =>{

    console.log(req.params)
    res.send(req.params)
}

let testQuery = (req,res) =>{

    console.log(req.query)
    res.send(req.query)
}

let testBody = (req,res) => {

    console.log(req.body)
    res.send(req.body)
}*/

let getAllBlog = (req, res) => {

    BlogModel.find()
        .select('-_v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                res.send(err)
            }
            else if (result == undefined || result == null || result == '') {
                console.log('no blog found')
                res.send('no blog found')
            }

            else {
                res.send(result)
            }
        })
} //end of getAllBlog

let viewByBlogId = (req, res) => {

    BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {

        if (err) {
            console.log(err)
            res.send(err)
        }
        else if (result == undefined || result == null || result == '') {

            console.log('no blog found')
            res.send('no blog found')
        }
        else {
            res.send(result)
        }
    })
} //end of view byBlogId

let createBlog = (req, res) => {

    var today = Date.now()
    let blogId = shortid.generate()

    let newBlog = new BlogModel({
        blogId: blogId,
        title: req.body.title,
        description: req.body.description,
        bodyHtml: req.body.blogBody,
        isPublished: true,
        category: req.body.category,
        author: req.body.fullName,
        created: today,
        lastModified: today
    })// end of newBlog model

    let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : []
    newBlog.tags = tags

    newBlog.save((err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        }
        else {
            res.send(result)
        }
    })

}

module.exports = {
    // helloWorld : helloWorldFunction,
    //printExample : printExample  
    /*testRoute:testRoute,
    testQuery:testQuery,
    testBody:testBody*/

    getAllBlog: getAllBlog,
    viewByBlogId: viewByBlogId,
    createBlog: createBlog
}










