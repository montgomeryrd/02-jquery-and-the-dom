'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// The following function is an object constructor. The captilized A in the declared function lets us know that. The contextual "this" is in reference to that object constructor's properties. The parameter "rawDataObj" will be used to pass arguments into the object constructor function... not sure if I said that correctly. Essentially rawDataObj will be the properties of the new Article.

function Article (rawDataObj) {
  // TODONE: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
}

Article.prototype.toHtml = function() {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // Cloning copies the set of matched elements as well as all of their descendant elements and text nodes.

  let $newArticle = $('article.template').clone();
  /* TODONE: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */

  $newArticle.removeClass('template');

  /* If no published date, call it a draft. */
  if (!this.publishedOn) $newArticle.addClass('draft'); //if no published date, draft

  /* TODONE: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */
  $newArticle.attr('data-category', this.category);
  $newArticle.find('h1').text(this.title);
  $newArticle.find('address').text(this.author);
  $newArticle.attr('href', this.authorUrl);
  $newArticle.find('time').text(this.publishedOn);
  $newArticle.find('.article-body').append(this.body);


  // REVIEWED: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEWED: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODONE: Refactor these for loops using the .forEach() array method.

rawData.forEach(function(article){
  articles.push(new Article(article));
});
//For each rawData, push to articles array
//for(let i = 0; i < rawData.length; i++) {
//  articles.push(new Article(rawData[i]));
//}

articles.forEach(function(someRandomName){
  $('#articles').append(someRandomName.toHtml());
});
// for(let i = 0; i < articles.length; i++) {
//  $('#articles').append(articles[i].toHtml());
//}
