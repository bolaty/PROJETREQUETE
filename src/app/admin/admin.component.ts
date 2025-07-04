import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';
import { LanguageService } from 'src/app/services/language.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

//declare var $: any; // Si vous utilisez jQuery

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  recupinfo: any = '';
  recupinfoDroitUser: any;
  ListeNotification: any = [];
  nombreNotif: any = 0;
  boutons: any = [];
  libelles: any = [];
  tab_lecture_notif: any = [];
  ListeRetourRequete: any = [];
  tab_req_en_cours_trait: any = [];
  reqcodeclient: any;
  reqmessageclient: any;
  maVariableSubscription?: Subscription;
  code_requete: any;
  active_menu_1: any = '';
  active_route_1: any = '';
  active_menu_2: any = '';
  active_route_2: any = '';
  recupinfos: any = JSON.parse(sessionStorage.getItem('infoLogin') || '');
  constructor(
    public AdminService: AdminService,
    private _router: Router,
    public LanguageService: LanguageService,
    private toastr: ToastrService
  ) {}
  routeDashboard() {
    window.location.href = 'admin/dashboard';
  }
  Deconnexion() {
    // $.removeCookie('isLoggedIn', { path: '/' });
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = 'auth/login';
  }

  InitialisationMainJs() {
    'use strict';
    var i18NextHttpBackend;
    //@ts-ignore
    let isRtl = window.Helpers.isRtl(),
      //@ts-ignore
      isDarkStyle = window.Helpers.isDarkStyle(),
      //@ts-ignore
      menu,
      animate,
      isHorizontalLayout = false;

    if (document.getElementById('layout-menu')) {
      //@ts-ignore
      isHorizontalLayout = document
        .getElementById('layout-menu')
        .classList.contains('menu-horizontal');
    }

    (function () {
      // Button & Pagination Waves effect
      //@ts-ignore
      if (typeof Waves !== 'undefined') {
        //@ts-ignore
        Waves.init();
        //@ts-ignore
        Waves.attach(
          ".btn[class*='btn-']:not(.position-relative):not([class*='btn-outline-']):not([class*='btn-label-'])",
          ['waves-light']
        );
        //@ts-ignore
        Waves.attach("[class*='btn-outline-']:not(.position-relative)");
        //@ts-ignore
        Waves.attach("[class*='btn-label-']:not(.position-relative)");
        //@ts-ignore
        Waves.attach('.pagination .page-item .page-link');
        //@ts-ignore
        Waves.attach('.dropdown-menu .dropdown-item');
        //@ts-ignore
        Waves.attach('.light-style .list-group .list-group-item-action');
        //@ts-ignore
        Waves.attach('.dark-style .list-group .list-group-item-action', [
          'waves-light',
        ]);
        //@ts-ignore
        Waves.attach('.nav-tabs:not(.nav-tabs-widget) .nav-item .nav-link');
        //@ts-ignore
        Waves.attach('.nav-pills .nav-item .nav-link', ['waves-light']);
        //@ts-ignore
        Waves.attach('.menu-vertical .menu-item .menu-link.menu-toggle');
      }

      // Window scroll function for navbar
      function onScroll() {
        var layoutPage = document.querySelector('.layout-page');
        if (layoutPage) {
          if (window.pageYOffset > 0) {
            layoutPage.classList.add('window-scrolled');
          } else {
            layoutPage.classList.remove('window-scrolled');
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
      var menu = '';
      let layoutMenuEl = document.querySelectorAll('#layout-menu');
      layoutMenuEl.forEach(function (element) {
        //@ts-ignore
        menu = new Menu(element, {
          orientation: isHorizontalLayout ? 'horizontal' : 'vertical',
          closeChildren: isHorizontalLayout ? true : false,
          // ? This option only works with Horizontal menu
          showDropdownOnHover: localStorage.getItem(
            //@ts-ignore
            'templateCustomizer-' + templateName + '--ShowDropdownOnHover'
          ) // If value(showDropdownOnHover) is set in local storage
            ? localStorage.getItem(
                //@ts-ignore
                'templateCustomizer-' + templateName + '--ShowDropdownOnHover'
              ) === 'true' // Use the local storage value
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
      let menuToggler = document.querySelectorAll('.layout-menu-toggle');
      menuToggler.forEach((item) => {
        item.addEventListener('click', (event) => {
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
                'templateCustomizer-' + templateName + '--LayoutCollapsed',
                //@ts-ignore
                String(window.Helpers.isCollapsed())
              );
              // Update customizer checkbox state on click of menu toggler
              let layoutCollapsedCustomizerOptions = document.querySelector(
                '.template-customizer-layouts-options'
              );
              if (layoutCollapsedCustomizerOptions) {
                //@ts-ignore
                let layoutCollapsedVal = window.Helpers.isCollapsed()
                  ? 'collapsed'
                  : 'expanded';
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
      window.Helpers.swipeIn('.drag-target', function (e) {
        //@ts-ignore
        window.Helpers.setCollapsed(false);
      });

      // Detect swipe gesture on the target element and call swipe Out
      //@ts-ignore
      window.Helpers.swipeOut('#layout-menu', function (e) {
        //@ts-ignore
        if (window.Helpers.isSmallScreen()) window.Helpers.setCollapsed(true);
      });

      // Display in main menu when menu scrolls
      let menuInnerContainer = document.getElementsByClassName('menu-inner'),
        menuInnerShadow =
          document.getElementsByClassName('menu-inner-shadow')[0];
      if (menuInnerContainer.length > 0 && menuInnerShadow) {
        //@ts-ignore
        menuInnerContainer[0].addEventListener('ps-scroll-y', function () {
          //@ts-ignore
          if (this.querySelector('.ps__thumb-y').offsetTop) {
            //@ts-ignore
            menuInnerShadow.style.display = 'block';
          } else {
            //@ts-ignore
            menuInnerShadow.style.display = 'none';
          }
        });
      }

      // Update light/dark image based on current style
      function switchImage(style: any) {
        if (style === 'system') {
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            style = 'dark';
          } else {
            style = 'light';
          }
        }
        const switchImagesList = [].slice.call(
          document.querySelectorAll('[data-app-' + style + '-img]')
        );
        switchImagesList.map(function (imageEl) {
          //@ts-ignore
          const setImage = imageEl.getAttribute('data-app-' + style + '-img');
          //@ts-ignore
          imageEl.src = assetsPath + 'img/' + setImage; // Using window.assetsPath to get the exact relative path
        });
      }

      //Style Switcher (Light/Dark/System Mode)
      let styleSwitcher = document.querySelector('.dropdown-style-switcher');

      // Get style from local storage or use 'system' as default
      let storedStyle =
        //@ts-ignore
        localStorage.getItem(
          //@ts-ignore
          'templateCustomizer-' + templateName + '--Style'
        ) || //if no template style then use Customizer style
        //@ts-ignore
        (window.templateCustomizer?.settings?.defaultStyle ?? 'light'); //!if there is no Customizer then use default style as light

      // Set style on click of style switcher item if template customizer is enabled
      //@ts-ignore
      if (window.templateCustomizer && styleSwitcher) {
        let styleSwitcherItems = [].slice.call(
          styleSwitcher.children[1].querySelectorAll('.dropdown-item')
        );
        styleSwitcherItems.forEach(function (item) {
          //@ts-ignore
          item.addEventListener('click', function () {
            //@ts-ignore
            let currentStyle = this.getAttribute('data-theme');
            if (currentStyle === 'light') {
              //@ts-ignore
              window.templateCustomizer.setStyle('light');
            } else if (currentStyle === 'dark') {
              //@ts-ignore
              window.templateCustomizer.setStyle('dark');
            } else {
              //@ts-ignore
              window.templateCustomizer.setStyle('system');
            }
          });
        });

        // Update style switcher icon based on the stored style

        const styleSwitcherIcon = styleSwitcher.querySelector('i');
        //@ts-ignore
        let pointer = this;
        if (storedStyle === 'light') {
          //@ts-ignore
          styleSwitcherIcon.classList.add('mdi-weather-sunny');
          //@ts-ignore
          new bootstrap.Tooltip(styleSwitcherIcon, {
            title: pointer.LanguageService.header_brightness_btn_title,
            fallbackPlacements: ['bottom'],
          });
        } else if (storedStyle === 'dark') {
          //@ts-ignore
          styleSwitcherIcon.classList.add('mdi-weather-night');
          //@ts-ignore
          new bootstrap.Tooltip(styleSwitcherIcon, {
            title: pointer.LanguageService.header_brightness_btn_title,
            fallbackPlacements: ['bottom'],
          });
        } else {
          //@ts-ignore
          styleSwitcherIcon.classList.add('mdi-monitor');
          //@ts-ignore
          new bootstrap.Tooltip(styleSwitcherIcon, {
            title: pointer.LanguageService.header_brightness_btn_title,
            fallbackPlacements: ['bottom'],
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
        typeof i18next !== 'undefined' &&
        typeof i18NextHttpBackend !== 'undefined'
      ) {
        //@ts-ignore
        i18next
          //@ts-ignore
          .use(i18NextHttpBackend)
          .init({
            lng: 'en',
            debug: false,
            fallbackLng: 'en',
            backend: {
              //@ts-ignore
              loadPath: assetsPath + 'json/locales/{{lng}}.json',
            },
            returnObjects: true,
          })
          .then(function (t: any) {
            localize();
          });
      }

      let languageDropdown =
        document.getElementsByClassName('dropdown-language');

      if (languageDropdown.length) {
        let dropdownItems =
          languageDropdown[0].querySelectorAll('.dropdown-item');

        for (let i = 0; i < dropdownItems.length; i++) {
          dropdownItems[i].addEventListener('click', function () {
            //@ts-ignore
            let currentLanguage = this.getAttribute('data-language');
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
                    .querySelector('.dropdown-item')
                    .classList.remove('active');
                }
                siblingEle = siblingEle.nextSibling;
              }
            }
            //@ts-ignore
            this.classList.add('active');
            //@ts-ignore
            i18next.changeLanguage(currentLanguage, (err, t) => {
              if (err) return console.log('something went wrong loading', err);
              localize();
            });
          });
        }
      }

      function localize() {
        let i18nList = document.querySelectorAll('[data-i18n]');
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
        '.dropdown-notifications-all'
      );
      const notificationMarkAsReadList = document.querySelectorAll(
        '.dropdown-notifications-read'
      );

      // Notification: Mark as all as read
      if (notificationMarkAsReadAll) {
        notificationMarkAsReadAll.addEventListener('click', (event) => {
          notificationMarkAsReadList.forEach((item) => {
            //@ts-ignore
            item
              .closest('.dropdown-notifications-item')
              .classList.add('marked-as-read');
          });
        });
      }
      // Notification: Mark as read/unread onclick of dot
      if (notificationMarkAsReadList) {
        notificationMarkAsReadList.forEach((item) => {
          item.addEventListener('click', (event) => {
            //@ts-ignore
            item
              .closest('.dropdown-notifications-item')
              .classList.toggle('marked-as-read');
          });
        });
      }

      // Notification: Mark as read/unread onclick of dot
      const notificationArchiveMessageList = document.querySelectorAll(
        '.dropdown-notifications-archive'
      );
      notificationArchiveMessageList.forEach((item) => {
        item.addEventListener('click', (event) => {
          //@ts-ignore
          item.closest('.dropdown-notifications-item').remove();
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
        if (e.type == 'show.bs.collapse' || e.type == 'show.bs.collapse') {
          e.target.closest('.accordion-item').classList.add('active');
        } else {
          e.target.closest('.accordion-item').classList.remove('active');
        }
      };

      const accordionTriggerList = [].slice.call(
        document.querySelectorAll('.accordion')
      );
      const accordionList = accordionTriggerList.map(function (
        accordionTriggerEl
      ) {
        //@ts-ignore
        accordionTriggerEl.addEventListener(
          'show.bs.collapse',
          accordionActiveFunction
        ); //@ts-ignore
        accordionTriggerEl.addEventListener(
          'hide.bs.collapse',
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
          window.Helpers.setNavbarFixed('fixed');
        } else {
          //@ts-ignore
          window.Helpers.setNavbarFixed('');
        }
      }

      // On window resize listener
      // -------------------------
      window.addEventListener(
        'resize',
        function (event) {
          // Hide open search input and set value blank
          //@ts-ignore
          if (window.innerWidth >= window.Helpers.LAYOUT_BREAKPOINT) {
            if (document.querySelector('.search-input-wrapper')) {
              //@ts-ignore
              document
                .querySelector('.search-input-wrapper')
                .classList.add('d-none'); //@ts-ignore
              document.querySelector('.search-input').value = '';
            }
          }
          // Horizontal Layout : Update menu based on window size
          if (horizontalMenuTemplate) {
            // if screen size is small then set navbar fixed
            //@ts-ignore
            if (window.innerWidth < window.Helpers.LAYOUT_BREAKPOINT) {
              //@ts-ignore
              window.Helpers.setNavbarFixed('fixed');
            } else {
              //@ts-ignore
              window.Helpers.setNavbarFixed('');
            }
            setTimeout(function () {
              //@ts-ignore
              if (window.innerWidth < window.Helpers.LAYOUT_BREAKPOINT) {
                if (document.getElementById('layout-menu')) {
                  if (
                    //@ts-ignore
                    document
                      .getElementById('layout-menu')
                      .classList.contains('menu-horizontal')
                  ) {
                    //@ts-ignore
                    menu.switchMenu('vertical');
                  }
                }
              } else {
                if (document.getElementById('layout-menu')) {
                  if (
                    //@ts-ignore
                    document
                      .getElementById('layout-menu')
                      .classList.contains('menu-vertical')
                  ) {
                    //@ts-ignore
                    menu.switchMenu('horizontal');
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
      if (typeof TemplateCustomizer !== 'undefined') {
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
      if (typeof config !== 'undefined') {
        //@ts-ignore
        if (config.enableMenuLocalStorage) {
          try {
            if (
              localStorage.getItem(
                //@ts-ignore
                'templateCustomizer-' + templateName + '--LayoutCollapsed'
              ) !== null
            )
              //@ts-ignore
              window.Helpers.setCollapsed(
                localStorage.getItem(
                  //@ts-ignore
                  'templateCustomizer-' + templateName + '--LayoutCollapsed'
                ) === 'true',
                false
              );
          } catch (e) {}
        }
      }
    })();

    // ! Removed following code if you do't wish to use jQuery. Remember that navbar search functionality will stop working on removal.
    //@ts-ignore
    if (typeof $ !== 'undefined') {
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
        var searchToggler = $('.search-toggler'),
          //@ts-ignore
          searchInputWrapper = $('.search-input-wrapper'),
          //@ts-ignore
          searchInput = $('.search-input'),
          //@ts-ignore
          contentBackdrop = $('.content-backdrop');

        // Open search input on click of search icon
        if (searchToggler.length) {
          searchToggler.on('click', function () {
            if (searchInputWrapper.length) {
              searchInputWrapper.toggleClass('d-none');
              searchInput.focus();
            }
          });
        }
        // Open search on 'CTRL+/'
        //@ts-ignore
        $(document).on('keydown', function (event) {
          let ctrlKey = event.ctrlKey,
            slashKey = event.which === 191;

          if (ctrlKey && slashKey) {
            if (searchInputWrapper.length) {
              searchInputWrapper.toggleClass('d-none');
              searchInput.focus();
            }
          }
        });
        // Note: Following code is required to update container class of typeahead dropdown width on focus of search input. setTimeout is required to allow time to initiate Typeahead UI.
        setTimeout(function () {
          //@ts-ignore
          var twitterTypeahead = $('.twitter-typeahead');
          searchInput.on('focus', function () {
            if (searchInputWrapper.hasClass('container-xxl')) {
              searchInputWrapper
                .find(twitterTypeahead)
                .addClass('container-xxl');
              twitterTypeahead.removeClass('container-fluid');
            } else if (searchInputWrapper.hasClass('container-fluid')) {
              searchInputWrapper
                .find(twitterTypeahead)
                .addClass('container-fluid');
              twitterTypeahead.removeClass('container-xxl');
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
          var searchJson = 'search-vertical.json'; // For vertical layout
          //@ts-ignore
          if ($('#layout-menu').hasClass('menu-horizontal')) {
            var searchJson = 'search-horizontal.json'; // For vertical layout
          }
          // Search API AJAX call
          //@ts-ignore
          var searchData = $.ajax({
            //@ts-ignore
            url: assetsPath + 'json/' + searchJson, //? Use your own search api instead
            dataType: 'json',
            async: false,
          }).responseJSON;
          // Init typeahead on searchInput
          searchInput.each(function () {
            //@ts-ignore
            var $this = $(this); //@ts-ignore
            searchInput //@ts-ignore
              .typeahead(
                {
                  hint: false,
                  classNames: {
                    menu: 'tt-menu navbar-search-suggestion',
                    cursor: 'active',
                    suggestion:
                      'suggestion d-flex justify-content-between px-3 py-2 w-100',
                  },
                },
                // ? Add/Update blocks as per need
                // Pages
                {
                  name: 'pages',
                  display: 'name',
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
                        '<div>' +
                        '<i class="mdi ' +
                        icon +
                        ' me-2"></i>' +
                        '<span class="align-middle">' +
                        name +
                        '</span>' +
                        '</div>' +
                        '</a>'
                      );
                    },
                    notFound:
                      '<div class="not-found px-3 py-2">' +
                      '<h6 class="suggestions-header text-primary mb-2">Pages</h6>' +
                      '<p class="py-2 mb-0"><i class="mdi mdi-alert-circle-outline me-2 mdi-14px"></i> No Results Found</p>' +
                      '</div>',
                  },
                },
                // Files
                {
                  name: 'files',
                  display: 'name',
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
                        '</h6>' +
                        '<small class="text-muted">' +
                        subtitle +
                        '</small>' +
                        '</div>' +
                        '</div>' +
                        '<small class="text-muted">' +
                        meta +
                        '</small>' +
                        '</a>'
                      );
                    },
                    notFound:
                      '<div class="not-found px-3 py-2">' +
                      '<h6 class="suggestions-header text-primary mb-2">Files</h6>' +
                      '<p class="py-2 mb-0"><i class="mdi mdi-alert-circle-outline me-2 mdi-14px"></i> No Results Found</p>' +
                      '</div>',
                  },
                },
                // Members
                {
                  name: 'members',
                  display: 'name',
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
                        '</h6>' +
                        '<small class="text-muted">' +
                        subtitle +
                        '</small>' +
                        '</div>' +
                        '</div>' +
                        '</a>'
                      );
                    },
                    notFound:
                      '<div class="not-found px-3 py-2">' +
                      '<h6 class="suggestions-header text-primary mb-2">Members</h6>' +
                      '<p class="py-2 mb-0"><i class="mdi mdi-alert-circle-outline me-2 mdi-14px"></i> No Results Found</p>' +
                      '</div>',
                  },
                }
              )
              //On typeahead result render.
              .bind('typeahead:render', function () {
                // Show content backdrop,
                contentBackdrop.addClass('show').removeClass('fade');
              })

              // On typeahead select
              //@ts-ignore
              .bind('typeahead:select', function (ev, suggestion) {
                // Open selected page
                if (suggestion.url) {
                  window.location = suggestion.url;
                }
              })
              // On typeahead close
              .bind('typeahead:close', function () {
                // Clear search
                searchInput.val(''); //@ts-ignore
                $this.typeahead('val', '');
                // Hide search input wrapper
                searchInputWrapper.addClass('d-none');
                // Fade content backdrop
                contentBackdrop.addClass('fade').removeClass('show');
              });

            // On searchInput keyup, Fade content backdrop if search input is blank
            searchInput.on('keyup', function () {
              if (searchInput.val() == '') {
                contentBackdrop.addClass('fade').removeClass('show');
              }
            });
          });

          // Init PerfectScrollbar in search result
          //@ts-ignore
          var psSearch;
          //@ts-ignore
          $('.navbar-search-suggestion').each(function () {
            //@ts-ignore
            psSearch = new PerfectScrollbar($(this)[0], {
              wheelPropagation: false,
              suppressScrollX: true,
            });
          });

          searchInput.on('keyup', function () {
            //@ts-ignore
            psSearch.update();
          });
        }
      });
    }
  }

  ChoixCreation(ecran: any) {
    sessionStorage.setItem('choix_ecran', ecran);
  }

  Notification() {
    this.recupinfo = JSON.parse(sessionStorage.getItem('infoLogin') || '');
    var statusOp = 'N';
    var datejrouagence = '01/01/1900';
    /* var d = new Date();
    var date = d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
    var jour = d.getDate();
    if (jour < 10) {
      var date =
        '0' + d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
      console.log(date);
    }*/
    var d = new Date();
    var jour = d.getDate();
    var mois = d.getMonth() + 1; // Les mois sont comptés de 0 à 11 en JavaScript
    var annee = d.getFullYear();

    // Ajout des zéros devant le jour et le mois s'ils sont inférieurs à 10
    var date =
      (jour < 10 ? '0' + jour : jour) +
      '-' +
      (mois < 10 ? '0' + mois : mois) +
      '-' +
      annee;

    if (this.recupinfo[0].NA_LIBELLETYPEUTILISATEUR.includes('ADMIN')) {
      datejrouagence = date;
    } else {
      datejrouagence = this.recupinfo[0].AG_CODEAGENCE;
    }
    let Option = 'RequeteClientsClasse.svc/pvgListeSMS';
    let body = {
      Objets: [
        {
          OE_PARAM: [
            datejrouagence,
            this.recupinfo[0].CU_CODECOMPTEUTULISATEUR,
            '0003',
            'N',
          ],
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '01',
          },
        },
      ],
    };
    this.AdminService.AppelServeur(body, Option).subscribe((success: any) => {
      this.ListeNotification = success;
      this.ListeNotification = this.ListeNotification.pvgListeSMSResult;
      console.log('this.ListeNotification', this.ListeNotification);
      if (this.ListeNotification[0].clsResultat.SL_RESULTAT == 'TRUE') {
        this.nombreNotif = this.ListeNotification.length;

        // formater les dates
        for (let index = 0; index < this.ListeNotification.length; index++) {
          // SM_DATEEMISSIONSMS
          this.AdminService.variable_1 =
            this.ListeNotification[index].SM_DATEEMISSIONSMS.split(':');
          this.AdminService.variable_2 = this.AdminService.variable_1[0].substr(
            0,
            10
          );

          this.ListeNotification[index].SM_DATEEMISSIONSMS =
            this.AdminService.variable_2;

          // SM_DATEPIECE
          this.AdminService.variable_1 =
            this.ListeNotification[index].SM_DATEPIECE.split(':');
          this.AdminService.variable_2 = this.AdminService.variable_1[0].substr(
            0,
            10
          );

          this.ListeNotification[index].SM_DATEPIECE =
            this.AdminService.variable_2;
        }

        // traduction message notif
        for (let index = 0; index < this.ListeNotification.length; index++) {
          this.ListeNotification[index].SM_MESSAGE_TRANSLATE = this.Translate(
            this.ListeNotification[index].SM_MESSAGE,
            this.LanguageService.langue_en_cours
          );
        }
      } else {
        this.nombreNotif = 0;
        this.ListeNotification[0].SM_MESSAGE =
          "Aucune reclamation pour l'instant"; // this.LanguageService.header_notification_empty //Aucune reclamation pour l'instant;

        // traduction message notif
        for (let index = 0; index < this.ListeNotification.length; index++) {
          this.ListeNotification[index].SM_MESSAGE_TRANSLATE = this.Translate(
            this.ListeNotification[index].SM_MESSAGE,
            this.LanguageService.langue_en_cours
          );
        }

        this.ListeNotification[0].SM_STATUT = '';
        this.ListeNotification[0].SM_DATEEMISSIONSMS = '';
      }
    });
  }

  Translate(key: any, targetLanguage: any) {
    if (
      this.LanguageService.translations &&
      key in this.LanguageService.translations
    ) {
      return this.LanguageService.translations[key];
    } else {
      // Si la traduction pour le texte demandé dans la langue cible n'est pas trouvée,
      // vous pouvez renvoyer le texte original ou une indication que la traduction est manquante.
      return key;
    }
  }

  ChangementDeCouleur() {
    // selection
    this.boutons = document.getElementsByClassName('bttn');
    this.libelles = document.getElementsByClassName('text_label');
    // var elmt2 = document.getElementById('Headercolor');
    //@ts-ignore
    /* elmt2.style.backgroundColor = this.AdminService.ColorApplication;
    //@ts-ignore
    elmt2.style.color = this.AdminService.ColorApplicationText; */

    // application
    for (let i = 0; i < this.boutons.length; i++) {
      this.boutons[i].style.backgroundColor = '#A3C9AA';
      // this.boutons[i].style.color = this.AdminService.ColorApplicationText;
    }
    for (let j = 0; j < this.libelles.length; j++) {
      // this.libelles[j].style.backgroundColor = '#A3C9AA';
      this.libelles[j].style.color = '#A3C9AA';
    }
  }

  AllerAuSuivi(notif: any) {
    this.reqmessageclient = notif.SM_MESSAGE;

    let Option = 'RequeteClientsClasse.svc/pvgLectureNotification';
    let body = {
      Objets: [
        {
          OE_PARAM: [
            notif.AG_CODEAGENCE,
            notif.SM_DATEPIECE,
            notif.SM_NUMSEQUENCE,
          ],
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '01',
          },
        },
      ],
    };

    this.code_requete = notif.SM_MESSAGE_TRANSLATE.split(':')[1];
    this.code_requete = this.code_requete.replace(/[^0-9]/g, '');
    console.log('code_requete', this.code_requete);
    // this.ListeRequete();
    this.AdminService.AppelServeur(body, Option).subscribe((success: any) => {
      this.tab_lecture_notif = success;
      this.tab_lecture_notif =
        this.tab_lecture_notif.pvgLectureNotificationResult;
      console.log('this.tab_lecture_notif', this.tab_lecture_notif);
      if (this.tab_lecture_notif[0].clsResultat.SL_RESULTAT == 'TRUE') {
        this.ListeRequete();
      }
    });
  }

  ListeRequete() {
    this.recupinfo = JSON.parse(sessionStorage.getItem('infoLogin') || '');

    var Option = '';
    var body = {};

    /*Option = 'RequeteClientsClasse.svc/pvgChargerDansDataSetParOperateurs';
    body = {
      Objets: [
        {
          OE_PARAM: ['01', this.recupinfo[0].CU_CODECOMPTEUTULISATEUR],
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '01',
          },
        },
      ],
    };*/

    if (this.recupinfo[0].TU_CODETYPEUTILISATEUR == '0001') {
      Option = 'RequeteClientsClasse.svc/pvgChargerDansDataSetParOperateurs';
      body = {
        Objets: [
          {
            OE_PARAM: ['01', this.recupinfo[0].CU_CODECOMPTEUTULISATEUR],
            clsObjetEnvoi: {
              ET_CODEETABLISSEMENT: '',
              AN_CODEANTENNE: '',
              TYPEOPERATION: '01',
            },
          },
        ],
      };
      this.AdminService.ShowLoader();
      this.AdminService.AppelServeur(body, Option).subscribe(
        (success: any) => {
          this.ListeRetourRequete = success;
          this.ListeRetourRequete =
            this.ListeRetourRequete.pvgChargerDansDataSetParOperateursResult;
          this.AdminService.CloseLoader();
          if (this.ListeRetourRequete[0].clsResultat.SL_RESULTAT == 'TRUE') {
            this.tab_req_en_cours_trait = [];

            for (
              let index = 0;
              index < this.ListeRetourRequete.length;
              index++
            ) {
              if (
                this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].AT_DATEDEBUTTRAITEMENTETAPE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].AT_DATECLOTUREETAPE ==
                  '01/01/1900'
              ) {
                this.tab_req_en_cours_trait.push(
                  this.ListeRetourRequete[index]
                );
              }
            }

            // traduction :: traduction de chaque bloc
            for (
              let index = 0;
              index < this.tab_req_en_cours_trait.length;
              index++
            ) {
              // verifier la langue en cours
              this.tab_req_en_cours_trait[
                index
              ].TR_LIBELLETYEREQUETE_TRANSLATE = this.Translate(
                this.tab_req_en_cours_trait[index].TR_LIBELLETYEREQUETE,
                this.LanguageService.langue_en_cours
              );

              this.tab_req_en_cours_trait[index].RE_LIBELLEETAPE_TRANSLATE =
                this.Translate(
                  this.tab_req_en_cours_trait[index].RE_LIBELLEETAPE,
                  this.LanguageService.langue_en_cours
                );
            }
            // traduction

            for (
              let index = 0;
              index < this.tab_req_en_cours_trait.length;
              index++
            ) {
              if (
                this.tab_req_en_cours_trait[index].RQ_CODEREQUETE ==
                this.code_requete
              ) {
                // sauvegarde des infos
                sessionStorage.setItem(
                  'infoReque',
                  JSON.stringify(this.tab_req_en_cours_trait[index])
                );

                break;
              }
            }

            this.Notification();
            this._router.navigate(['/admin/reclamations/liste/SuiviRequete']);
            // window.location.href = '/admin/reclamations/liste/SuiviRequete';
          } else {
            this.toastr.info(
              this.ListeRetourRequete[0].clsResultat.SL_MESSAGE,
              'info',
              { positionClass: 'toast-bottom-left' }
            );
          }
        },
        (error) => {
          this.AdminService.CloseLoader();
          this.toastr.warning(
            this.ListeRetourRequete[0].clsResultat.SL_MESSAGE,
            'warning',
            { positionClass: 'toast-bottom-left' }
          );
        }
      );
    }
    if (this.recupinfo[0].TU_CODETYPEUTILISATEUR == '0002') {
      // Expression régulière pour rechercher le numéro de ticket
      var regex = /numéro de ticket (\d+)/;

      // Recherche du numéro de ticket dans le message
      var match = this.reqmessageclient.match(regex);

      // Si un numéro de ticket est trouvé
      if (match && match.length > 1) {
        this.reqcodeclient = match[1];
        //console.log("Numéro de ticket : " + numeroTicket);
      }

      if (match == null) {
        this.toastr.error(
          "Cette notification n'autorise pas d'actions.",
          'error',
          { positionClass: 'toast-bottom-left' }
        );
      } else {
        Option = 'RequeteClientsClasse.svc/pvgListeReqrequete';
        body = {
          Objets: [
            {
              OE_PARAM: ['01', this.recupinfo[0].CU_CODECOMPTEUTULISATEUR],
              clsObjetEnvoi: {
                ET_CODEETABLISSEMENT: '',
                AN_CODEANTENNE: '',
                TYPEOPERATION: '01',
              },
            },
          ],
        };
        this.AdminService.ShowLoader();
        this.AdminService.AppelServeur(body, Option).subscribe(
          (success: any) => {
            this.ListeRetourRequete = success;
            this.ListeRetourRequete =
              this.ListeRetourRequete.pvgListeReqrequeteResult;
            this.AdminService.CloseLoader();
            if (this.ListeRetourRequete[0].clsResultat.SL_RESULTAT == 'TRUE') {
              this.tab_req_en_cours_trait = [];

              for (
                let index = 0;
                index < this.ListeRetourRequete.length;
                index++
              ) {
                if (
                  this.ListeRetourRequete[index].RQ_CODEREQUETE ==
                  this.reqcodeclient
                ) {
                  this.tab_req_en_cours_trait.push(
                    this.ListeRetourRequete[index]
                  );
                }
              }

              // traduction :: traduction de chaque bloc
              for (
                let index = 0;
                index < this.tab_req_en_cours_trait.length;
                index++
              ) {
                // verifier la langue en cours
                this.tab_req_en_cours_trait[
                  index
                ].TR_LIBELLETYEREQUETE_TRANSLATE = this.Translate(
                  this.tab_req_en_cours_trait[index].TR_LIBELLETYEREQUETE,
                  this.LanguageService.langue_en_cours
                );

                this.tab_req_en_cours_trait[index].RE_LIBELLEETAPE_TRANSLATE =
                  this.Translate(
                    this.tab_req_en_cours_trait[index].RE_LIBELLEETAPE,
                    this.LanguageService.langue_en_cours
                  );
              }
              // traduction

              for (
                let index = 0;
                index < this.tab_req_en_cours_trait.length;
                index++
              ) {
                if (
                  this.ListeRetourRequete[index].RQ_CODEREQUETE ==
                  this.reqcodeclient
                ) {
                  // sauvegarde des infos
                  sessionStorage.setItem(
                    'infoReque',
                    JSON.stringify(this.tab_req_en_cours_trait[index])
                  );

                  break;
                }
              }

              this.Notification();
              this._router.navigate(['/admin/reclamations/liste/SuiviRequete']);
              // window.location.href = '/admin/reclamations/liste/SuiviRequete';
            } else {
              this.toastr.info(
                this.ListeRetourRequete[0].clsResultat.SL_MESSAGE,
                'info',
                { positionClass: 'toast-bottom-left' }
              );
            }
          },
          (error) => {
            this.AdminService.CloseLoader();
            this.toastr.warning(
              this.ListeRetourRequete[0].clsResultat.SL_MESSAGE,
              'warning',
              { positionClass: 'toast-bottom-left' }
            );
          }
        );
      }
    }

    console.log('table_des_requetes', this.tab_req_en_cours_trait);
  }

  // Fonction à exécuter lorsque la variable change
  ObserveChangeForTranslate(): void {
    // traduction message notif
    for (let index = 0; index < this.ListeNotification.length; index++) {
      this.ListeNotification[index].SM_MESSAGE_TRANSLATE = this.Translate(
        this.ListeNotification[index].SM_MESSAGE,
        this.LanguageService.langue_en_cours
      );
    }
  }

  RecupScreen() {
    var stat = screen.width;
    console.log('stat', stat);
    if (stat > 1179) {
      this.AdminService.for_phone = false;
      console.log('this.AdminService.for_phone', this.AdminService.for_phone);
    } else {
      this.AdminService.for_phone = true;
      console.log('this.AdminService.for_phone', this.AdminService.for_phone);
    }
  }

  TestMobile() {
    this.AdminService.showMenuMobile = false;
  }
  TestMobile2() {
    this.AdminService.showMenuMobile = true;
  }
  chargementParamDroit() {
    this.recupinfo = JSON.parse(sessionStorage.getItem('infoLogin') || '');
    if (this.recupinfo[0].NA_LIBELLETYPEUTILISATEUR.includes('ADMIN')) {
      for (var i = 0; i < this.AdminService.objetEcran.length; i++) {
        this.AdminService.objetEcran[i].STATUTOBJET = 'O';
      }
    } else {
      this.recupinfoDroitUser = sessionStorage.getItem('ListeDroitUsers');
      if (this.recupinfoDroitUser == null || this.recupinfoDroitUser == '') {
      } else {
        this.recupinfoDroitUser = JSON.parse(
          sessionStorage.getItem('ListeDroitUsers') || ''
        );

        for (var i = 0; i < this.AdminService.objetEcran.length; i++) {
          //@ts-ignore
          const contientObjet = this.recupinfoDroitUser.some(
            //@ts-ignore
            (objet) =>
              objet.DP_OBJET == this.AdminService.objetEcran[i].NOMOBJET
          );

          if (contientObjet) {
            this.AdminService.objetEcran[i].STATUTOBJET = 'O';
          } else {
            this.AdminService.objetEcran[i].STATUTOBJET = 'N';
          }
        }
      }
    }
  }
  ngOnDestroy(): void {
    // Assurez-vous de vous désabonner pour éviter les fuites de mémoire
    this.maVariableSubscription?.unsubscribe();
  }

  initNavbarDropdownScrollbar() {
    const scrollbarContainer = document.querySelectorAll(
      '.navbar-dropdown .scrollable-container'
    ); //@ts-ignore
    const { PerfectScrollbar } = window;

    if (PerfectScrollbar !== undefined) {
      if (
        typeof scrollbarContainer !== 'undefined' &&
        scrollbarContainer !== null
      ) {
        scrollbarContainer.forEach((el) => {
          // eslint-disable-next-line no-new
          new PerfectScrollbar(el, {
            wheelPropagation: false,
            suppressScrollX: true,
          });
        });
      }
    }
  }

  ngOnInit(): void {
    if (!this.AdminService.for_phone) {
      this.AdminService.showMenuMobile = false;
    }

    // this.initNavbarDropdownScrollbar();
    // $(`#${this.current_menu}`).css('background-color', '#B87333');

    this.chargementParamDroit();
    setTimeout(() => {
      this.InitialisationMainJs();
    }, 1000);

    //setInterval(() => {
    this.Notification();
    //}, 2000);

    // info sur le theme de l'app
    let pointer = this;
    let stop;
    stop = setInterval(function () {
      pointer.ChangementDeCouleur();
    }, 1000);

    // Abonnez-vous au flux observable dans le service
    this.maVariableSubscription =
      this.LanguageService.getMaVariableObservable().subscribe(
        (value: boolean) => {
          // Votre fonction à exécuter lorsque la variable change
          if (value) {
            this.ObserveChangeForTranslate();
          }
        }
      );

    // info sur le type de device
    let pointer2 = this;
    let stop2;
    stop2 = setInterval(function () {
      pointer2.RecupScreen();
    }, 5000);

    // info sur les notifications
    let pointer3 = this;
    let stop3;
    stop3 = setInterval(function () {
      pointer3.Notification();
    }, 7000);
  }
}
