/**
Copyright (c) 2012 Marco Pegoraro, http://movableapp.com/

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


WHERE TO FIND MEDIA TABLE:
https://github.com/thepeg/MediaTable
http://consulenza-web.com/jquery/MediaTable/
http://www.consulenza-web.com/2012/01/mediatable-jquery-plugin/

**/


/**
 * MediaTable jQuery Plugin.
 */
;(function($){
  /**
   * DOM Initialization Logic.
   *
   * This seems to basically be the constructor, though I have no idea why
   * it's called "loop".
   */
  var __loop = function(cfg, i) {

    var $this   = $(this),
      wdg   = $this.data('MediaTable');

    // Prevent re-initialization of the widget!
    if (!$.isEmptyObject(wdg)) {
      return;
    }

    // Build the widget context.
    wdg = {
      // Refer to the main content of the widget.
      $wrap: $('<div>'),
      // Refer to the MediaTable DOM (TABLE TAG).
      $table: $this,
      // Refer to the column's toggler menu container.
      $menu: false,
      // Widget local configuration object.
      cfg: cfg,
      id: $this.attr('id')
    };

    // Setup Widget ID if not specified into DOM Table.
    if (!wdg.id) {
      wdg.id = 'MediaTable-' + i;
      wdg.$table.attr('id', wdg.id);
    }

    // Activate the MediaTable.
    wdg.$table.addClass('activeMediaTable');

    // Create the wrapper.
    wdg.$wrap.addClass('mediaTableWrapper');

    // Place the wrapper near the table and fill with MediaTable.
    wdg.$table.before(wdg.$wrap).appendTo(wdg.$wrap);

    // Menu initialization logic.
    if (wdg.cfg.menu) {
      __initMenu(wdg);
    }

    // Columns Initialization Loop.
    wdg.$table.find('thead th').each(function(i) {
      __thInit.call(this, i, wdg);
    });

    // Save widget context into table DOM.
    wdg.$table.data('MediaTable', wdg);

  }; // EndOf: "__loop()" ###

    /**
     * Builds the Menu DOM object.
     *
     * @param object wdg
     *   The mediatable widget object.
     */
    var __initMenu = function(wdg) {

      // Buid menu objects
      /*
       * @todo Support configurable menu DOM wrapper.
       *
       * As is, the code below creates a new DOM element (a div) into which
       * the menu gets inserted. Update this so that if the menuWrapper config
       * parameter is passed in the config JSON, the specified DOM element
       * will be loaded instead of creating a new DIV. NOTE: that DOM element
       * will need to be emptied of all contents before use.
       *
       * Config Parameter:
       *   - menuWrapper (string): The ID of the DOM element to use as the
       *     menu wrapper.
       *
       * @todo Allow the specification of custom classes to use for the
       * various HTML elements here?
       */
      wdg.$menu       = $('<div />');
      wdg.$menu.$header   = $('<a />');
      wdg.$menu.$list   = $('<ul />');

      // Setup menu general properties and append to DOM.
      wdg.$menu
        .addClass('mediaTableMenu')
        .addClass('mediaTableMenuClosed')
        .append(wdg.$menu.$header)
        .append(wdg.$menu.$list);

      // Add a class to the wrapper to inform about menu presence.
      wdg.$wrap.addClass('mediaTableWrapperWithMenu');

      // Setup menu title (handler)
      /*
       * @todo Support configuration of Menu Icon/Image instead of Text.
       *
       * Enable the following config parameters:
       *   - menuTitle (already exists)
       *   - menuImage: a string containing the full, absolute URI of the
       *     image to use as an icon.
       *
       * If menuImage is provided, use an <img> tag with menuImage as the src,
       * menuTitle as the alt text and an appropriate set of default
       * dimensions (may consider exposing as config in the future, but that
       * may be unnecessary if designers can resize with CSS.).
       *
       * If menuImage is omitted, use menuTitle as text content.
       */
      // Check the configuration option for the menuImage parameter.
      if (wdg.cfg.menuImage && wdg.cfg.menuImage ! "") {
        // If a menuImage is provided, insert an image tag with this image.
        wdg.$menu.$header.html('<img src="' + wdg.cfg.menuImage + '" alt="' + wdg.cfg.menuTitle + '" style="height: 32; width: 32" />');
      }
      else {
        // If not, insert text for the menu title.
        wdg.$menu.$header.text(wdg.cfg.menuTitle);
      }

      wdg.$table.before(wdg.$menu);

      // Bind screen change events to update checkbox status of displayed fields.
      $(window).bind('orientationchange resize',function(){
        wdg.$menu.find('input').trigger('updateCheck');
      });

      // Toggle list visibility when clicking the menu title.
      wdg.$menu.$header.bind('click',function(){
        wdg.$menu.toggleClass('mediaTableMenuClosed');
      });

      wdg.$table.click(function() {
        wdg.$menu.addClass('mediaTableMenuClosed');
      });

      // Toggle list visibilty when mouse go outside the list itself.
      wdg.$menu.$list.bind('mouseleave',function(e){
        wdg.$menu.toggleClass('mediaTableMenuClosed');
        e.stopPropagation();
      });
    }; // EndOf: "__initMenu()" ###

    var __thInit = function(i, wdg) {

      var $th   = $(this),
        id    = $th.attr('id'),
        classes = $th.attr('class');
      // @todo Check to see if this column should be hidden by default and
      // set the appropriate attributes.
      //
      // Set up an auto-generated ID for the column.
      // the ID is based upon widget's ID to allow multiple tables into one page.
      if (!id) {
        id = wdg.id + '-mediaTableCol-' + i;
        $th.attr('id', id);
      }

      // Add toggle link to the menu.
      if (wdg.cfg.menu && !$th.is('.persist')) {
        /*
         * @todo Hide by default if configged?
         * This may be where the logic to hide by default should be added.
         *
         * @todo Enable better configuration of the rendering of menu items.
         * This is where we can provide additional control over the rendering
         * of elements. I thought maybe of exposing the following configurable
         * options through wdg.cfg:
         *
         * 1) useCheckbox (bool): true/false to insert the checkbox or not.
         * 2) selectedClass (string): the class name to use for menu items
         *    that are visible.
         * 3) hiddenClass (string): the class name to use for menu items that
         *    are hidden.
         *
         * This would allow the theme layer to have greater control over the
         * styling of the row - to do things such as highlighting selected
         * rows one color and hidden rows another, for instance.
         *
         * After reviewing the code below (in __liInitActions()), supporting
         * non-checkbox items would require some overhaul that I don't want to
         * get into if I don't have to. It seems simplest to just hide the
         * checkbox with CSS, so if the designers don't want the checkbox to
         * show, they should simply hide it that way.
         *
         * That would only allow hiding or showing of ALL checkboxes. There's
         * not currently support for hiding checkboxes of hidden columns while
         * showing checkboxes of visible columns or something like that. I
         * can't imagine that would be desired, but who knows.
         */
        var $li = $('<li><input type="checkbox" name="toggle-cols" id="toggle-col-' + wdg.id + '-' + i + '" value="' + id + '" /> <label for="toggle-col-' + wdg.id + '-' + i + '">' + $th.text() + '</label></li>');
        wdg.$menu.$list.append($li);

        __liInitActions($th, $li.find('input'), wdg);

      }

      // Propagate column's properties to each cell.
      $('tbody tr',wdg.$table).each(function() {
        __trInit.call(this, i, id, classes, $th);
      });
    }; // EndOf: "__thInit()" ###

    /**
     * Initializes mediatable functionality for each row of a column.
     *
     * @param int i
     *   The column index of the column.
     * @param string id
     *   The HTML ID of the header cell.
     * @param string classes
     *   The HTML classes of the header cell.
     * @param object th
     *   The header cell DOM object.
     */
    var __trInit = function(i, id, classes, th) {

      var $cell = $(this).find('td,th').eq(i);

      $cell.attr('headers', id);

      if (classes) {
        $cell.addClass(classes);
      }

      /*
       * @todo Check to see if this column should be hidden by default.
       *
       * Set the appropriate attributes. Do I need to pass additional
       * arguments? I might need to pass the row here....
       */
    }; // EndOf: "__trInit()" ###

    /**
     * Adds event handlers to a column's menu item in the drop down.
     *
     * @param object $th
     *   The Column header cell.
     * @param object $checkbox
     *   The Menu item checkbox DOM object.
     * @param object wdg
     *   The MediaTable widget object.
     */
    var __liInitActions = function($th, $checkbox, wdg) {
      /*
       * @todo Swap the hidden/visible classes when an item is changed.
       * Not sure if this needs to happen in change() or updateChecked, but it
       * needs to happen somewhere in here.
       */

      /**
       * Hide or show a column.
       *
       * This is the callback function that will be executed when a column
       * name is clicked in the menu to be either hidden or shown.
       */
      var change = function() {
        /*
         * @todo Support Drupal Sticky Headers here?
         * This may or may not be the best place to support sticky headers...
         *
         * It seems like bad design to do it here. That would be inserting a
         * dependency or at least a specification upstream of where it needs
         * to be. If I put Drupal Specific code here, then that Drupal
         * specific code would be present even if this was used outside the
         * Drupal context. That doesn't make sense. Perhaps I should look into
         * adding a secondary listener to these behaviors in my code. I will
         * have to figure out how to do that...
         */

        /*
         * [ML (2016/06/29)]: WTF is happening here? This line ends with a
         * comma...
         *
         * Does JavaScript allow you to define multiple variables after a
         * single "var" keyword in a comma separated list? That must be what
         * is happening.
         *
         * Yup: http://goo.gl/RCM8na
         *
         * So this is functionally equivalent to php:
         *   $val = $checkbox->val();
         *   $cols = $wdg->table->find();
         *
         * or rather, functionally equivalent to this in javascript:
         *   var val = $checkbox.val();
         *   var cols = wdg.$table.find(...);
         */

        // Variable val equals the header's ID, i.e. "company".
        var val = $checkbox.val(),
        // Variable cols, the cells in this column, so we can easily find the
        // matching header (id="company") and cells (headers="company").
            cols  = wdg.$table.find("#" + val + ", [headers=" + val + "]");

        if ($checkbox.is(":checked")) {
          cols.show();
        }
        else {
          cols.hide();
        };
      };

      /**
       * Update the checkbox of a menu item.
       *
       * This callback function updates the checkbox of a menu item dependent
       * upon whether it is visible or not.
       */
      var updateCheck = function() {
        /*
         * @todo Support hidden by default?
         *
         * Maybe I need to do something here to reflect the hidden by
         * default option? We'll see. If what I do upstream of this results in
         * the element not being :visible, then I don't think I need to do
         * anything.
         */
        if ($th.is(':visible')) {
          $checkbox.attr("checked", true);
        }
        else {
          $checkbox.attr("checked", false);
        };

      };

      // [ML (2016/06/29)]: I'm not entirely certain how this chaining works...
      // I don't think I need to mess with it, though, so unless it's really
      // not working the way you want it to, leave it alone!
      $checkbox
        .bind('change', change)
        .bind('updateCheck', updateCheck)
        .trigger('updateCheck');

    } // EndOf: "__liInitActions()" ###

  /**
   * Destructor function for the widget.
   */
  var __destroy = function() {

    // Get the widget context.
    var wdg = $(this).data('MediaTable');

    if (!wdg) {
      return;
    }

    // Remove the wrapper from the MediaTable.
    wdg.$wrap.after(wdg.$table).remove();

    // Remove MediaTable active class so media-query will not work.
    wdg.$table.removeClass('activeMediaTable');

    // Remove DOM reference to the widget context.
    wdg.$table.data('MediaTable', null);

  }; // EndOf: "__destroy()" ###

  /**
   * MediaTable jQuery Extension.
   *
   * @param object cfg
   *   Optional. Pass a JSON object with Configuration parameters to control
   *   how this plugin operates. Here are your configuration options:
   *   - menu: A boolean value. Set to TRUE to use a menu. If you set to
   *     false, you will have no menu, and the whole thing will be pointless.
   *   - menuTitle: The text title to apply to the menu button.
   *   - menuImage: The full, absolute URI of the image to use as on icon. If
   *     provided, the Title you specify will be used as the alt text. If
   *     ommitted, the Title you specify will be placed in the button as a
   *     HTML text.
   *   - menuWrapper: The ID of the DOM element to use as the container for
   *     the menu.
   */
  $.fn.mediaTable = function() {
    var cfg = false;

    // Default configuration block.
    if (!arguments.length || $.isPlainObject(arguments[0])) {
      cfg = $.extend({}, {
        menu: true,
        menuTitle: 'Columns:',
        // [ML (2016/06/29)]: I have no idea what this does.
        t: 'e'
      }, arguments[0]);
    }

    // Items initialization loop:
    if (cfg !== false) {
      // Item actions loop - switch throught actions.
      $(this).each(function(i) {
        __loop.call(this, cfg, i);
      });
    }
    else if (arguments.length) {
      switch (arguments[0]) {
        case 'destroy':
          $(this).each(function() {
            __destroy.call(this);
          });
          break;
      }
    }

    // Mantengo la possibilit? di concatenare plugins.
    return this;
  }; // EndOf: "$.fn.mediaTable()" ###
})(jQuery);
