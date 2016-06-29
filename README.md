# MediaTable
A Responsive Table jQuery plugin that provides the option to show/hide columns.

## Contents:

 * Overview
 * Dependencies
 * Installation
 * Example Usage
 * Configuration Options
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

For Drupal sites, this will be done for you by the Views MediaTable module. All you need to do is put this library in either sites/all/libraries/MediaTable/jquery.mediaTable.js or sites/{example.com}/libraries/jquery.mediaTable.js.

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
        <tr>
          <td>Row 2, Column 1</td>
          <td>Row 2, Column 2</td>
          <td>Row 2, Column 3</td>
          <td>Row 2, Column 4</td>
        </tr>
        <tr>
          <td>Row 3, Column 1</td>
          <td>Row 3, Column 2</td>
          <td>Row 3, Column 3</td>
          <td>Row 3, Column 4</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
```

The work in this branch will allow you to specify some additional options to be passed to the mediaTable method in a JSON object, but more detail is pending on that.

## Configuration Options
You can pass a JSON object to the mediaTable method with configuration parameters. It is not required that you pass this object, nor that you set any of the values. If you omit the object, the widget will behave as designed in version 1.1.0. The following are the configurable settings:

| Option | Data Type | Description | Defaults To |
|---------------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|
| menu | Boolean | A boolean value. Set to FALSE to disable the menu, but why would you want to do that? If you have no menu, you won't be able to show or hide columns and the whole thing will be pointless. | true |
| menuTitle | String | The text title to apply to the menu button. | "Columns:" |
| menuImage | String | The full, absolute URI of the image to use as an icon. If provided, the Title you specify will be used as the alt text. If ommitted, the Title you specify will be placed in the button as a HTML text. | NULL |
| menuWrapper | String | The ID of the DOM element to use as the container for the menu. If omitted, a new element will be created and prepended to the table. | NULL |
| columnSelectedClass | String | An HTML class to apply to the menu item for columns that are selected. | mediatable-column-selected |
| columnHiddenClass | String | An HTML class to apply to the menu item for columns that are hidden. | mediatable-column-hidden |

Note that if you want the selected/hidden classes for menu items to actually change the appearance of those items, you will need to define those styles in CSS.

## Maintainers
 * Mike Lewis (mike.lewis@tqi.solutions)

## Release Notes
### Version 1.1.0
This release is planned, but still in progress. Further notes will be added when appropriate.

### Version 1.0.0
This is the version of the code as I received it from Marco Peg.
