/* global $*/
$(function(){

  $.get("/cities", appendToSelect); 

  function appendToSelect(cities) {
    var list = [];
    for(var i in cities) {
      list.push($('<option>', { text: cities[i] }, '</option>'));
    }
    $('.city-list').append(list);
  }
});