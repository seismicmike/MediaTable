# MediaTable
A Responsive Table jQuery plugin that provides the option to show/hide columns.

## Contents:

 * Overview
 * Dependencies
 * Installation
 * Example Usage
 * Maintainers
 * Release Notes

## Overview
This is an extension of the MediaTable library developed by http://marcopeg.com. The original repository can be found from this github repository.

The purpose of this extension was to enable my code to have more customized control over various things, such as:

 * Positioning of the menu within the DOM
 * Use of an image/icon instead of text for the menu
 * Compatability with Drupal Sticky Headers
 * Custom UI styling of the column options in the menu (i.e. not having to use checkboxes, but using highlighting instead.)
 * Allowing columns to be hidden by default with an option to show.

This work is ongoing in the 1.1.x-dev branch.

## Dependencies:
For any site:
 * jQuery 1.5+

For Drupal Sites, you will need:
 * jQuery Update
 * Views
 * Views MediaTable (http://drupal.org/project/views_mediatable).
   - Note that the Views MediaTable module does not fully support all of the new features listed above. I am making these improvements for use in my own custom module. Please inquire Dana Dunmyer (dana.dunmyer@tqi.solutions) if you are interested in them.

## Installation
Download this library and include it in your HTML DOM via a script tag.

```
<script type="text/javascript" src="/path/to/jquery.mediaTable.js"></script>
```

For Drupal sites, this will be done for you by the views_mediatable module. All you need to do is put this library in either sites/all/libraries/MediaTable/jquery.mediaTable.js or sites/{example.com}/libraries/jquery.mediaTable.js.

## Example Usage:
A live demo can be found here: http://marcopeg.com/MediaTable/, though it does not show all of the features noted above.

The most basic usage of creating a table would be to create the table in your DOM, give it an ID and then call the mediaTable(); method on it in your Javascript.

```
<html>
  <head>
    <script type="text/JavaScript" src="path/to/jQuery.js"></script>
    <script type="text/Javascript" src="path/to/jquery.mediaTable.js"></script>
    <script type="text/Javascript">
      $(document).read(function() {
        $('#myTable').mediaTable();
      });
    </script>
  </head>
  <body>
    <table id="myTable">
      <thead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
          <th>Column 4</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Row 1, Column 1</td>
          <td>Row 1, Column 2</td>
          <td>Row 1, Column 3</td>
          <td>Row 1, Column 4</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
```

The work in this branch will allow you to specify some additional options to be passed to the mediaTable method in a JSON object, but more detail is pending on that.

## Maintainers
 * Mike Lewis (mike.lewis@tqi.solutions)

## Release Notes
### Version 1.1.0
This release is planned, but still in progress. Further notes will be added when appropriate.

### Version 1.0.0
I tagged Version 1.0.0 to be the version I forked from MarcoPeg.
