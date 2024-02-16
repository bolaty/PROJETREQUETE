import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
//declare var $: any; // Si vous utilisez jQuery

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  recupinfo: any = JSON.parse(sessionStorage.getItem("infoLogin") || '');

  constructor(
    private _router: Router
  ){}

  Deconnexion() {
    // $.removeCookie('isLoggedIn', { path: '/' });
     sessionStorage.clear();
     localStorage.clear();
     window.location.href='auth/login'
   }
  InitialisationMainJs() {
    "use strict";
    var i18NextHttpBackend;
    //@ts-ignore
    let isRtl = window.Helpers.isRtl(),
      //@ts-ignore
      isDarkStyle = window.Helpers.isDarkStyle(),
      //@ts-ignore
      menu,
      animate,
      isHorizontalLayout = false;

    if (document.getElementById("layout-menu")) {
      //@ts-ignore
      isHorizontalLayout = document
        .getElementById("layout-menu")
        .classList.contains("menu-horizontal");
    }

    (function () {
      // Button & Pagination Waves effect
      //@ts-ignore
      if (typeof Waves !== "undefined") {
        //@ts-ignore
        Waves.init();
        //@ts-ignore
        Waves.attach(
          ".btn[class*='btn-']:not(.position-relative):not([class*='btn-outline-']):not([class*='btn-label-'])",
          ["waves-light"]
        );
        //@ts-ignore
        Waves.attach("[class*='btn-outline-']:not(.position-relative)");
        //@ts-ignore
        Waves.attach("[class*='btn-label-']:not(.position-relative)");
        //@ts-ignore
        Waves.attach(".pagination .page-item .page-link");
        //@ts-ignore
        Waves.attach(".dropdown-menu .dropdown-item");
        //@ts-ignore
        Waves.attach(".light-style .list-group .list-group-item-action");
        //@ts-ignore
        Waves.attach(".dark-style .list-group .list-group-item-action", [
          "waves-light",
        ]);
        //@ts-ignore
        Waves.attach(".nav-tabs:not(.nav-tabs-widget) .nav-item .nav-link");
        //@ts-ignore
        Waves.attach(".nav-pills .nav-item .nav-link", ["waves-light"]);
        //@ts-ignore
        Waves.attach(".menu-vertical .menu-item .menu-link.menu-toggle");
      }

      // Window scroll function for navbar
      function onScroll() {
        var layoutPage = document.querySelector(".layout-page");
        if (layoutPage) {
          if (window.pageYOffset > 0) {
            layoutPage.classList.add("window-scrolled");
          } else {
            layoutPage.classList.remove("window-scrolled");
          }
        }
      }
      // On load time out
      setTimeout(() => {
        onScroll();
      }, 200);

      // On window scroll
      window.onscroll = function () {
        onScroll();
      };

      setTimeout(function () {
        //@ts-ignore
        window.Helpers.initCustomOptionCheck();
      }, 1000);

      // Initialize menu
      //-----------------
      var menu = "";
      let layoutMenuEl = document.querySelectorAll("#layout-menu");
      layoutMenuEl.forEach(function (element) {
        //@ts-ignore
        menu = new Menu(element, {
          orientation: isHorizontalLayout ? "horizontal" : "vertical",
          closeChildren: isHorizontalLayout ? true : false,
          // ? This option only works with Horizontal menu
          showDropdownOnHover: localStorage.getItem(
            //@ts-ignore
            "templateCustomizer-" + templateName + "--ShowDropdownOnHover"
          ) // If value(showDropdownOnHover) is set in local storage
            ? localStorage.getItem(
                //@ts-ignore
                "templateCustomizer-" + templateName + "--ShowDropdownOnHover"
              ) === "true" // Use the local storage value
            : //@ts-ignore
            window.templateCustomizer !== undefined // If value is set in config.js
            ? //@ts-ignore
              window.templateCustomizer.settings.defaultShowDropdownOnHover // Use the config.js value
            : true, // Use this if you are not using the config.js and want to set value directly from here
        });
        // Change parameter to true if you want scroll animation
        //@ts-ignore
        window.Helpers.scrollToActive((animate = false));
        //@ts-ignore
        window.Helpers.mainMenu = menu;
      });

      // Initialize menu togglers and bind click on each
      let menuToggler = document.querySelectorAll(".layout-menu-toggle");
      menuToggler.forEach((item) => {
        item.addEventListener("click", (event) => {
          event.preventDefault();
          //@ts-ignore
          window.Helpers.toggleCollapsed();
          // Enable menu state with local storage support if enableMenuLocalStorage = true from config.js
          //@ts-ignore
          if (
            //@ts-ignore
            config.enableMenuLocalStorage &&
            //@ts-ignore
            !window.Helpers.isSmallScreen()
          ) {
            try {
              localStorage.setItem(
                //@ts-ignore
                "templateCustomizer-" + templateName + "--LayoutCollapsed",
                //@ts-ignore
                String(window.Helpers.isCollapsed())
              );
              // Update customizer checkbox state on click of menu toggler
              let layoutCollapsedCustomizerOptions = document.querySelector(
                ".template-customizer-layouts-options"
              );
              if (layoutCollapsedCustomizerOptions) {
                //@ts-ignore
                let layoutCollapsedVal = window.Helpers.isCollapsed()
                  ? "collapsed"
                  : "expanded";
                //@ts-ignore
                layoutCollapsedCustomizerOptions

                  .querySelector(`input[value="${layoutCollapsedVal}"]`) //@ts-ignore
                  .click();
              }
            } catch (e) {}
          }
        });
      });

      // Menu swipe gesture

      // Detect swipe gesture on the target element and call swipe In
      //@ts-ignore
      window.Helpers.swipeIn(".drag-target", function (e) {
        //@ts-ignore
        window.Helpers.setCollapsed(false);
      });

      // Detect swipe gesture on the target element and call swipe Out
      //@ts-ignore
      window.Helpers.swipeOut("#layout-menu", function (e) {
        //@ts-ignore
        if (window.Helpers.isSmallScreen()) window.Helpers.setCollapsed(true);
      });

      // Display in main menu when menu scrolls
      let menuInnerContainer = document.getElementsByClassName("menu-inner"),
        menuInnerShadow =
          document.getElementsByClassName("menu-inner-shadow")[0];
      if (menuInnerContainer.length > 0 && menuInnerShadow) {
        //@ts-ignore
        menuInnerContainer[0].addEventListener("ps-scroll-y", function () {
          //@ts-ignore
          if (this.querySelector(".ps__thumb-y").offsetTop) {
            //@ts-ignore
            menuInnerShadow.style.display = "block";
          } else {
            //@ts-ignore
            menuInnerShadow.style.display = "none";
          }
        });
      }

      // Update light/dark image based on current style
      function switchImage(style: any) {
        if (style === "system") {
          if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            style = "dark";
          } else {
            style = "light";
          }
        }
        const switchImagesList = [].slice.call(
          document.querySelectorAll("[data-app-" + style + "-img]")
        );
        switchImagesList.map(function (imageEl) {
          //@ts-ignore
          const setImage = imageEl.getAttribute("data-app-" + style + "-img");
          //@ts-ignore
          imageEl.src = assetsPath + "img/" + setImage; // Using window.assetsPath to get the exact relative path
        });
      }

      //Style Switcher (Light/Dark/System Mode)
      let styleSwitcher = document.querySelector(".dropdown-style-switcher");

      // Get style from local storage or use 'system' as default
      let storedStyle =
        //@ts-ignore
        localStorage.getItem(
          //@ts-ignore
          "templateCustomizer-" + templateName + "--Style"
        ) || //if no template style then use Customizer style
        //@ts-ignore
        (window.templateCustomizer?.settings?.defaultStyle ?? "light"); //!if there is no Customizer then use default style as light

      // Set style on click of style switcher item if template customizer is enabled
      //@ts-ignore
      if (window.templateCustomizer && styleSwitcher) {
        let styleSwitcherItems = [].slice.call(
          styleSwitcher.children[1].querySelectorAll(".dropdown-item")
        );
        styleSwitcherItems.forEach(function (item) {
          //@ts-ignore
          item.addEventListener("click", function () {
            //@ts-ignore
            let currentStyle = this.getAttribute("data-theme");
            if (currentStyle === "light") {
              //@ts-ignore
              window.templateCustomizer.setStyle("light");
            } else if (currentStyle === "dark") {
              //@ts-ignore
              window.templateCustomizer.setStyle("dark");
            } else {
              //@ts-ignore
              window.templateCustomizer.setStyle("system");
            }
          });
        });

        // Update style switcher icon based on the stored style

        const styleSwitcherIcon = styleSwitcher.querySelector("i");

        if (storedStyle === "light") {
          //@ts-ignore
          styleSwitcherIcon.classList.add("mdi-weather-sunny");
          //@ts-ignore
          new bootstrap.Tooltip(styleSwitcherIcon, {
            title: "Light Mode",
            fallbackPlacements: ["bottom"],
          });
        } else if (storedStyle === "dark") {
          //@ts-ignore
          styleSwitcherIcon.classList.add("mdi-weather-night");
          //@ts-ignore
          new bootstrap.Tooltip(styleSwitcherIcon, {
            title: "Dark Mode",
            fallbackPlacements: ["bottom"],
          });
        } else {
          //@ts-ignore
          styleSwitcherIcon.classList.add("mdi-monitor");
          //@ts-ignore
          new bootstrap.Tooltip(styleSwitcherIcon, {
            title: "System Mode",
            fallbackPlacements: ["bottom"],
          });
        }
      }
      // Run switchImage function based on the stored style
      switchImage(storedStyle);

      // Internationalization (Language Dropdown)
      // ---------------------------------------
      //@ts-ignore
      var i18next;
      if (
        typeof i18next !== "undefined" &&
        typeof i18NextHttpBackend !== "undefined"
      ) {
        //@ts-ignore
        i18next
          //@ts-ignore
          .use(i18NextHttpBackend)
          .init({
            lng: "en",
            debug: false,
            fallbackLng: "en",
            backend: {
              //@ts-ignore
              loadPath: assetsPath + "json/locales/{{lng}}.json",
            },
            returnObjects: true,
          })
          .then(function (t: any) {
            localize();
          });
      }

      let languageDropdown =
        document.getElementsByClassName("dropdown-language");

      if (languageDropdown.length) {
        let dropdownItems =
          languageDropdown[0].querySelectorAll(".dropdown-item");

        for (let i = 0; i < dropdownItems.length; i++) {
          dropdownItems[i].addEventListener("click", function () {
            //@ts-ignore
            let currentLanguage = this.getAttribute("data-language");
            //@ts-ignore
            for (let sibling of this.parentNode.children) {
              var siblingEle = sibling.parentElement.parentNode.firstChild;

              // Loop through each sibling and push to the array
              while (siblingEle) {
                if (
                  siblingEle.nodeType === 1 &&
                  siblingEle !== siblingEle.parentElement
                ) {
                  siblingEle
                    .querySelector(".dropdown-item")
                    .classList.remove("active");
                }
                siblingEle = siblingEle.nextSibling;
              }
            }
            //@ts-ignore
            this.classList.add("active");
            //@ts-ignore
            i18next.changeLanguage(currentLanguage, (err, t) => {
              if (err) return console.log("something went wrong loading", err);
              localize();
            });
          });
        }
      }

      function localize() {
        let i18nList = document.querySelectorAll("[data-i18n]");
        // Set the current language in dd
        let currentLanguageEle = document.querySelector(
          //@ts-ignore
          '.dropdown-item[data-language="' + i18next.language + '"]'
        );

        if (currentLanguageEle) {
          //@ts-ignore
          currentLanguageEle.click();
        }

        i18nList.forEach(function (item) {
          //@ts-ignore
          item.innerHTML = i18next.t(item.dataset.i18n);
        });
      }

      // Notification
      // ------------
      const notificationMarkAsReadAll = document.querySelector(
        ".dropdown-notifications-all"
      );
      const notificationMarkAsReadList = document.querySelectorAll(
        ".dropdown-notifications-read"
      );

      // Notification: Mark as all as read
      if (notificationMarkAsReadAll) {
        notificationMarkAsReadAll.addEventListener("click", (event) => {
          notificationMarkAsReadList.forEach((item) => {
            //@ts-ignore
            item
              .closest(".dropdown-notifications-item")
              .classList.add("marked-as-read");
          });
        });
      }
      // Notification: Mark as read/unread onclick of dot
      if (notificationMarkAsReadList) {
        notificationMarkAsReadList.forEach((item) => {
          item.addEventListener("click", (event) => {
            //@ts-ignore
            item
              .closest(".dropdown-notifications-item")
              .classList.toggle("marked-as-read");
          });
        });
      }

      // Notification: Mark as read/unread onclick of dot
      const notificationArchiveMessageList = document.querySelectorAll(
        ".dropdown-notifications-archive"
      );
      notificationArchiveMessageList.forEach((item) => {
        item.addEventListener("click", (event) => {
          //@ts-ignore
          item.closest(".dropdown-notifications-item").remove();
        });
      });

      // Init helpers & misc
      // --------------------

      // Init BS Tooltip
      const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        //@ts-ignore
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });

      // Accordion active class
      //@ts-ignore
      const accordionActiveFunction = function (e) {
        if (e.type == "show.bs.collapse" || e.type == "show.bs.collapse") {
          e.target.closest(".accordion-item").classList.add("active");
        } else {
          e.target.closest(".accordion-item").classList.remove("active");
        }
      };

      const accordionTriggerList = [].slice.call(
        document.querySelectorAll(".accordion")
      );
      const accordionList = accordionTriggerList.map(function (
        accordionTriggerEl
      ) {
        //@ts-ignore
        accordionTriggerEl.addEventListener(
          "show.bs.collapse",
          accordionActiveFunction
        ); //@ts-ignore
        accordionTriggerEl.addEventListener(
          "hide.bs.collapse",
          accordionActiveFunction
        );
      });

      // If layout is RTL add .dropdown-menu-end class to .dropdown-menu
      // if (isRtl) {
      //   Helpers._addClass('dropdown-menu-end', document.querySelectorAll('#layout-navbar .dropdown-menu'));
      // }

      // Auto update layout based on screen size
      //@ts-ignore
      window.Helpers.setAutoUpdate(true);

      // Toggle Password Visibility
      //@ts-ignore
      window.Helpers.initPasswordToggle();

      // Speech To Text
      //@ts-ignore
      window.Helpers.initSpeechToText();

      // Nav tabs animation
      //@ts-ignore
      window.Helpers.navTabsAnimation();

      // Init PerfectScrollbar in Navbar Dropdown (i.e notification)
      //@ts-ignore
      window.Helpers.initNavbarDropdownScrollbar();

      let horizontalMenuTemplate = document.querySelector(
        "[data-template^='horizontal-menu']"
      );
      if (horizontalMenuTemplate) {
        // if screen size is small then set navbar fixed
        //@ts-ignore
        if (window.innerWidth < window.Helpers.LAYOUT_BREAKPOINT) {
          //@ts-ignore
          window.Helpers.setNavbarFixed("fixed");
        } else {
          //@ts-ignore
          window.Helpers.setNavbarFixed("");
        }
      }

      // On window resize listener
      // -------------------------
      window.addEventListener(
        "resize",
        function (event) {
          // Hide open search input and set value blank
          //@ts-ignore
          if (window.innerWidth >= window.Helpers.LAYOUT_BREAKPOINT) {
            if (document.querySelector(".search-input-wrapper")) {
              //@ts-ignore
              document
                .querySelector(".search-input-wrapper")
                .classList.add("d-none"); //@ts-ignore
              document.querySelector(".search-input").value = "";
            }
          }
          // Horizontal Layout : Update menu based on window size
          if (horizontalMenuTemplate) {
            // if screen size is small then set navbar fixed
            //@ts-ignore
            if (window.innerWidth < window.Helpers.LAYOUT_BREAKPOINT) {
              //@ts-ignore
              window.Helpers.setNavbarFixed("fixed");
            } else {
              //@ts-ignore
              window.Helpers.setNavbarFixed("");
            }
            setTimeout(function () {
              //@ts-ignore
              if (window.innerWidth < window.Helpers.LAYOUT_BREAKPOINT) {
                if (document.getElementById("layout-menu")) {
                  if (
                    //@ts-ignore
                    document
                      .getElementById("layout-menu")
                      .classList.contains("menu-horizontal")
                  ) {
                    //@ts-ignore
                    menu.switchMenu("vertical");
                  }
                }
              } else {
                if (document.getElementById("layout-menu")) {
                  if (
                    //@ts-ignore
                    document
                      .getElementById("layout-menu")
                      .classList.contains("menu-vertical")
                  ) {
                    //@ts-ignore
                    menu.switchMenu("horizontal");
                  }
                }
              }
            }, 100);
          }
          //@ts-ignore
          window.Helpers.navTabsAnimation();
        },
        true
      );

      // Manage menu expanded/collapsed with templateCustomizer & local storage
      //------------------------------------------------------------------

      // If current layout is horizontal OR current window screen is small (overlay menu) than return from here
      //@ts-ignore
      if (isHorizontalLayout || window.Helpers.isSmallScreen()) {
        return;
      }

      // If current layout is vertical and current window screen is > small

      // Auto update menu collapsed/expanded based on the themeConfig
      //@ts-ignore
      if (typeof TemplateCustomizer !== "undefined") {
        //@ts-ignore
        if (window.templateCustomizer.settings.defaultMenuCollapsed) {
          //@ts-ignore
          window.Helpers.setCollapsed(true, false);
        } else {
          //@ts-ignore
          window.Helpers.setCollapsed(false, false);
        }
      }

      // Manage menu expanded/collapsed state with local storage support If enableMenuLocalStorage = true in config.js
      //@ts-ignore
      if (typeof config !== "undefined") {
        //@ts-ignore
        if (config.enableMenuLocalStorage) {
          try {
            if (
              localStorage.getItem(
                //@ts-ignore
                "templateCustomizer-" + templateName + "--LayoutCollapsed"
              ) !== null
            )
              //@ts-ignore
              window.Helpers.setCollapsed(
                localStorage.getItem(
                  //@ts-ignore
                  "templateCustomizer-" + templateName + "--LayoutCollapsed"
                ) === "true",
                false
              );
          } catch (e) {}
        }
      }
    })();

    // ! Removed following code if you do't wish to use jQuery. Remember that navbar search functionality will stop working on removal.
    //@ts-ignore
    if (typeof $ !== "undefined") {
      //@ts-ignore
      $(function () {
        // ! TODO: Required to load after DOM is ready, did this now with jQuery ready.
        //@ts-ignore
        window.Helpers.initSidebarToggle();
        // Toggle Universal Sidebar

        // Navbar Search with autosuggest (typeahead)
        // ? You can remove the following JS if you don't want to use search functionality.
        //----------------------------------------------------------------------------------

        //@ts-ignore
        var searchToggler = $(".search-toggler"),
          //@ts-ignore
          searchInputWrapper = $(".search-input-wrapper"),
          //@ts-ignore
          searchInput = $(".search-input"),
          //@ts-ignore
          contentBackdrop = $(".content-backdrop");

        // Open search input on click of search icon
        if (searchToggler.length) {
          searchToggler.on("click", function () {
            if (searchInputWrapper.length) {
              searchInputWrapper.toggleClass("d-none");
              searchInput.focus();
            }
          });
        }
        // Open search on 'CTRL+/'
        //@ts-ignore
        $(document).on("keydown", function (event) {
          let ctrlKey = event.ctrlKey,
            slashKey = event.which === 191;

          if (ctrlKey && slashKey) {
            if (searchInputWrapper.length) {
              searchInputWrapper.toggleClass("d-none");
              searchInput.focus();
            }
          }
        });
        // Note: Following code is required to update container class of typeahead dropdown width on focus of search input. setTimeout is required to allow time to initiate Typeahead UI.
        setTimeout(function () {
          //@ts-ignore
          var twitterTypeahead = $(".twitter-typeahead");
          searchInput.on("focus", function () {
            if (searchInputWrapper.hasClass("container-xxl")) {
              searchInputWrapper
                .find(twitterTypeahead)
                .addClass("container-xxl");
              twitterTypeahead.removeClass("container-fluid");
            } else if (searchInputWrapper.hasClass("container-fluid")) {
              searchInputWrapper
                .find(twitterTypeahead)
                .addClass("container-fluid");
              twitterTypeahead.removeClass("container-xxl");
            }
          });
        }, 10);

        if (searchInput.length) {
          // Filter config
          //@ts-ignore
          var filterConfig = function (data) {
            //@ts-ignore
            return function findMatches(q, cb) {
              //@ts-ignore
              let matches;
              matches = []; //@ts-ignore
              data.filter(function (i) {
                if (i.name.toLowerCase().startsWith(q.toLowerCase())) {
                  matches.push(i);
                } else if (
                  !i.name.toLowerCase().startsWith(q.toLowerCase()) &&
                  i.name.toLowerCase().includes(q.toLowerCase())
                ) {
                  matches.push(i); //@ts-ignore
                  matches.sort(function (a, b) {
                    return b.name < a.name ? 1 : -1;
                  });
                } else {
                  return [];
                }
              }); //@ts-ignore
              cb(matches);
            };
          };

          // Search JSON
          var searchJson = "search-vertical.json"; // For vertical layout
          //@ts-ignore
          if ($("#layout-menu").hasClass("menu-horizontal")) {
            var searchJson = "search-horizontal.json"; // For vertical layout
          }
          // Search API AJAX call
          //@ts-ignore
          var searchData = $.ajax({
            //@ts-ignore
            url: assetsPath + "json/" + searchJson, //? Use your own search api instead
            dataType: "json",
            async: false,
          }).responseJSON;
          // Init typeahead on searchInput
          searchInput.each(function () {
            //@ts-ignore
            var $this = $(this); //@ts-ignore
            searchInput.typeahead(
              {
                hint: false,
                classNames: {
                  menu: "tt-menu navbar-search-suggestion",
                  cursor: "active",
                  suggestion:
                    "suggestion d-flex justify-content-between px-3 py-2 w-100",
                },
              },
              // ? Add/Update blocks as per need
              // Pages
              {
                name: "pages",
                display: "name",
                limit: 5,
                source: filterConfig(searchData.pages),
                templates: {
                  header:
                    '<h6 class="suggestions-header text-primary mb-0 mx-3 mt-3 pb-2">Pages</h6>', //@ts-ignore
                  suggestion: function ({ url, icon, name }) {
                    return (
                      '<a href="' +
                      url +
                      '">' +
                      "<div>" +
                      '<i class="mdi ' +
                      icon +
                      ' me-2"></i>' +
                      '<span class="align-middle">' +
                      name +
                      "</span>" +
                      "</div>" +
                      "</a>"
                    );
                  },
                  notFound:
                    '<div class="not-found px-3 py-2">' +
                    '<h6 class="suggestions-header text-primary mb-2">Pages</h6>' +
                    '<p class="py-2 mb-0"><i class="mdi mdi-alert-circle-outline me-2 mdi-14px"></i> No Results Found</p>' +
                    "</div>",
                },
              },
              // Files
              {
                name: "files",
                display: "name",
                limit: 4,
                source: filterConfig(searchData.files),
                templates: {
                  header:
                    '<h6 class="suggestions-header text-primary mb-0 mx-3 mt-3 pb-2">Files</h6>', //@ts-ignore
                  suggestion: function ({ src, name, subtitle, meta }) {
                    return (
                      '<a href="javascript:;">' +
                      '<div class="d-flex w-50">' +
                      '<img class="me-3" src="' + //@ts-ignore
                      assetsPath +
                      src +
                      '" alt="' +
                      name +
                      '" height="32">' +
                      '<div class="w-75">' +
                      '<h6 class="mb-0">' +
                      name +
                      "</h6>" +
                      '<small class="text-muted">' +
                      subtitle +
                      "</small>" +
                      "</div>" +
                      "</div>" +
                      '<small class="text-muted">' +
                      meta +
                      "</small>" +
                      "</a>"
                    );
                  },
                  notFound:
                    '<div class="not-found px-3 py-2">' +
                    '<h6 class="suggestions-header text-primary mb-2">Files</h6>' +
                    '<p class="py-2 mb-0"><i class="mdi mdi-alert-circle-outline me-2 mdi-14px"></i> No Results Found</p>' +
                    "</div>",
                },
              },
              // Members
              {
                name: "members",
                display: "name",
                limit: 4,
                source: filterConfig(searchData.members),
                templates: {
                  header:
                    '<h6 class="suggestions-header text-primary mb-0 mx-3 mt-3 pb-2">Members</h6>', //@ts-ignore
                  suggestion: function ({ name, src, subtitle }) {
                    return (
                      '<a href="app-user-view-account.html">' +
                      '<div class="d-flex align-items-center">' +
                      '<img class="rounded-circle me-3" src="' + //@ts-ignore
                      assetsPath +
                      src +
                      '" alt="' +
                      name +
                      '" height="32">' +
                      '<div class="user-info">' +
                      '<h6 class="mb-0">' +
                      name +
                      "</h6>" +
                      '<small class="text-muted">' +
                      subtitle +
                      "</small>" +
                      "</div>" +
                      "</div>" +
                      "</a>"
                    );
                  },
                  notFound:
                    '<div class="not-found px-3 py-2">' +
                    '<h6 class="suggestions-header text-primary mb-2">Members</h6>' +
                    '<p class="py-2 mb-0"><i class="mdi mdi-alert-circle-outline me-2 mdi-14px"></i> No Results Found</p>' +
                    "</div>",
                },
              }
            )
            //On typeahead result render.
            .bind("typeahead:render", function () {
              // Show content backdrop,
              contentBackdrop.addClass("show").removeClass("fade");
            })
              
              // On typeahead select
              //@ts-ignore
              .bind("typeahead:select", function (ev, suggestion) {
                // Open selected page
                if (suggestion.url) {
                  window.location = suggestion.url;
                }
              })
              // On typeahead close
              .bind("typeahead:close", function () {
                // Clear search
                searchInput.val(""); //@ts-ignore
                $this.typeahead("val", "");
                // Hide search input wrapper
                searchInputWrapper.addClass("d-none");
                // Fade content backdrop
                contentBackdrop.addClass("fade").removeClass("show");
              });

            // On searchInput keyup, Fade content backdrop if search input is blank
            searchInput.on("keyup", function () {
              if (searchInput.val() == "") {
                contentBackdrop.addClass("fade").removeClass("show");
              }
            });
          });

          // Init PerfectScrollbar in search result
          //@ts-ignore
          var psSearch;
          //@ts-ignore
          $(".navbar-search-suggestion").each(function () {
            //@ts-ignore
            psSearch = new PerfectScrollbar($(this)[0], {
              wheelPropagation: false,
              suppressScrollX: true,
            });
          });

          searchInput.on("keyup", function () {
            //@ts-ignore
            psSearch.update();
          });
        }
      });
    }
  }

  ChoixCreation(ecran: any){
    sessionStorage.setItem('choix_ecran', ecran)
    if (ecran == 'client') {
      this._router.navigate(['/admin/Client']);
    } else {
      this._router.navigate(['/admin/Operateur']);
    }
  }


  ngOnInit(): void {
    setTimeout(() => {
      this.InitialisationMainJs();
    }, 1000);
  }
}
