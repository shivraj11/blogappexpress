const express = require('express')
const blogController = require('./../controllers/blogController')
const appConfig = require('./../config/appConfig')

let setRouter = (app) => {

//app.get('/helloo',blogController.helloWorld ),
//app.get('/examploo',blogController.printExample)
/*app.get('/test/route/:param1/:param2',blogController.testRoute);
app.get('/test/query',blogController.testQuery);
app.post('/test/body',blogController.testBody);*/

let baseUrl = appConfig.apiVersion+'/blogs';
app.get(baseUrl+'/all',blogController.getAllBlog);
app.get(baseUrl+'/view/:blogId',blogController.viewByBlogId);
app.post(baseUrl+'/create',blogController.createBlog);


//app.put(baseUrl+'/:blogId+/edit',blogController.editBlog);
//app.post(baseUrl+'/:blogId+/delete',blogController.deleteBlog);


}

module.exports = {
    setRouter : setRouter
}