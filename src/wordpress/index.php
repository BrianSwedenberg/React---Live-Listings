<?php

/*
  Plugin Name: Live Watch Listing
  Description: Display live listings of a given watch model
  Version: 1.0
  Author: Brian

*/

if( ! defined( 'ABSPATH' ) ) exit;

class LiveListing {
  function __construct(){
    add_action('enqueue_block_editor_assets', array($this, 'adminAssets'));
  }

  function adminAssets() {
    wp_enqueue_script('listingBlockType', plugin_dir_url(__FILE__) . 'test.js', array('wp-blocks', 'wp-element'));
  }
}

$liveListing = new LiveListing();