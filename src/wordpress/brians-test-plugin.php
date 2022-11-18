<?php

/*
  Plugin Name: Brian's First Test Plugin
  Description: First plugin to learn
  Version: 1.0
  Author: Brian
*/

add_filter('the_content', 'testFunction1');

function testFunction1($content) {
  return $content . '<p>My name is Brian</p>';
}
