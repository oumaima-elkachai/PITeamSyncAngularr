(function ($) {
	'use strict';
	jQuery(document).ready(function () {		
		// Preloader
		// setTimeout(function() {
			$('#preloader').addClass('hide');
		// }, 2000);

		$( "#preloader" ).append('<div class="hide-loader">Hide Preloader</div>');
		$('.hide-loader').click(function(e){
			$(this).parent().addClass('hide');
		});


		// Select 2 Start
    	function formatState (state) {
			if (!state.id) {
				return state.text;
			}		
			var baseUrl = "assets/img/svg/flags";
			var $state = $(
				'<span><img class="img-flag" /> <span></span></span>'
			);		
			// Use .text() instead of HTML string concatenation to avoid script injection issues
			$state.find("span").text(state.text);
			$state.find("img").attr("src", baseUrl + "/" + state.element.value.toLowerCase() + ".jpg");
			
			return $state;
		};

		$(".kleon-select-single").select2({
			templateSelection: formatState,
			minimumResultsForSearch: -1
		});

		$(".kleon-select-simple").select2({
			selectOnClose: true,
			minimumResultsForSearch: -1
		});

		$(".kleon-select-search").select2({
			selectOnClose: true,
		});

		$(".kleon-select-ajax").select2({
			ajax: {
			  url: "https://api.github.com/search/repositories",
			  dataType: 'json',
			  delay: 250,
			  data: function (params) {
				return {
				  q: params.term, // search term
				  page: params.page
				};
			  },
			  processResults: function (data, params) {
				// parse the results into the format expected by Select2
				// since we are using custom formatting functions we do not need to
				// alter the remote JSON data, except to indicate that infinite
				// scrolling can be used
				params.page = params.page || 1;
		  
				return {
				  results: data.items,
				  pagination: {
					more: (params.page * 30) < data.total_count
				  }
				};
			  },
			  cache: true
			},
			placeholder: 'Search for a repository',
			minimumInputLength: 1,
			templateResult: formatRepo,
			templateSelection: formatRepoSelection
		});
		  
		function formatRepo (repo) {
			if (repo.loading) {
			  return repo.text;
			}
		  
			var $container = $(
			  "<div class='select2-result-repository clearfix'>" +
				"<div class='select2-result-repository__avatar'><img src='" + repo.owner.avatar_url + "' /></div>" +
				"<div class='select2-result-repository__meta'>" +
				  "<div class='select2-result-repository__title'></div>" +
				  "<div class='select2-result-repository__description'></div>" +
				  "<div class='select2-result-repository__statistics'>" +
					"<div class='select2-result-repository__forks'><i class='bi bi-lightning-charge'></i> </div>" +
					"<div class='select2-result-repository__stargazers'><i class='bi bi-star'></i> </div>" +
					"<div class='select2-result-repository__watchers'><i class='bi bi-eye'></i> </div>" +
				  "</div>" +
				"</div>" +
			  "</div>"
			);
		  
			$container.find(".select2-result-repository__title").text(repo.full_name);
			$container.find(".select2-result-repository__description").text(repo.description);
			$container.find(".select2-result-repository__forks").append(repo.forks_count + " Forks");
			$container.find(".select2-result-repository__stargazers").append(repo.stargazers_count + " Stars");
			$container.find(".select2-result-repository__watchers").append(repo.watchers_count + " Watchers");
		  
			return $container;
		}
		  
		function formatRepoSelection (repo) {
			return repo.full_name || repo.text;
		}


		$(".kleon-select-auto").select2({
			selectOnClose: true,
		});

		$(".kleon-select-placeholder").select2({
			placeholder: "Select an option",
			allowClear: true
		});

		// Select 2 Start
    	function emailto (state) {
			if (!state.id) {
				return state.text;
			}		
			var baseUrl = "assets/img/clients";
			var $state = $(
				'<span><img class="avatar" /> <span></span></span>'
			);		
			// Use .text() instead of HTML string concatenation to avoid script injection issues
			$state.find("span").text(state.text);
			$state.find("img").attr("src", baseUrl + "/" + state.element.value.toLowerCase() + ".jpg");
			
			return $state;
		};
		$(".kleon-select-email").select2({
			templateSelection: emailto
		});

		// Select2 End 


        // Add Menu Item Current Class Auto
		function dynamicCurrentMenuClass(selector) {
			let FileName = window.location.href.split("/").reverse()[0];

			selector.find("li").each(function () {
				let anchor = $(this).find("a");
				if ($(anchor).attr("href") == FileName) {
					$(this).addClass("active");
				}
			});
			// if any li has .current elmnt add class
			selector.children("li").each(function () {
				if ($(this).find(".active").length) {
					$(this).addClass("active");
				}
			});
			// if no file name return
			if ("" == FileName) {
				selector.find("li").eq(0).addClass("active");
			}
		}
		
		if ($('.kleon-vertical-nav .kleon-navmenu .main-menu').length) {
			dynamicCurrentMenuClass($('.kleon-vertical-nav .kleon-navmenu .main-menu'));
		}

		// Header Option in Responsive
		$('.kleon-header-expand-toggle').on('click', function(e) {
			$('.header-mobile-option').toggleClass('expand');
			e.stopPropagation();
			e.preventDefault();
		});

		// Add Class in body tag
		$('.kleon-vertical-nav-toggle').on('click', function(e) {
			$('body').toggleClass('kleon-vertical-nav--collapse');
			e.stopPropagation();
			e.preventDefault();
		});
	
		$('.kleon-mobile-menu-opener').on('click', function(e) {
			$('body').toggleClass('kleon-vertical-nav--active');
			e.stopPropagation();
			e.preventDefault();
		});

        // Sub-Menu Open On-Click
        $('.kleon-navmenu ul.main-menu li.menu-item-has-children > a, .kleon-navmenu ul.main-menu li.menu-item-has-children .submenu-opener').on("click", function(e){
            $(this).parent().toggleClass('nav-open');
            $(this).siblings('ul').slideToggle();
            e.stopPropagation();
            e.preventDefault();
        });


		// Add Menu Item Current Class Auto
		function dynamicCurrentMenuClass(selector) {
			let FileName = window.location.href.split("/").reverse()[0];

			selector.find("li").each(function () {
				let anchor = $(this).find("a");
				if ($(anchor).attr("href") == FileName) {
					$(this).addClass("active");
				}
			});
			// if any li has .current elmnt add class
			selector.children("li").each(function () {
				if ($(this).find(".active").length) {
					$(this).addClass("active");
				}
			});
			// if no file name return
			if ("" == FileName) {
				selector.find("li").eq(0).addClass("active");
			}
		}
		
		if ($('.kleon-vertical-nav .kleon-navmenu .main-menu').length) {
			dynamicCurrentMenuClass($('.kleon-vertical-nav .kleon-navmenu .main-menu'));
		}


		// Form Repeater: Basic
		$(".basic-repeater").repeater({
			show: function () {
                $(this).slideDown();
            },
		});

		// Form Control Repeater 
		$(".email-repeater, .file-repeater").repeater({
			show: function () {
                $(this).slideDown();
            },
			hide: function (deleteElement) {
                if(confirm('Think again before delete.')) {
                    $(this).slideUp(deleteElement);
                }
            },
			isFirstItemUndeletable: false
		});

		// First item Undeletable
		$(".first-item-undeletable").repeater({
			show: function () {
                $(this).slideDown();
            },
			hide: function (deleteElement) {
                if(confirm('Think again before delete.')) {
                    $(this).slideUp(deleteElement);
                }
            },
			isFirstItemUndeletable: true
		});


		


		// Basic Form Wizard / Multistep Form
        var tabcount = 0;
       
        $('.form-wizard-block #wizard-next').on('click', function(e) {
            e.preventDefault();

            $(this).parents('.form-wizard-block').next().addClass('active');
            $(this).parents('.form-wizard-block').removeClass('active');
            
            tabcount+=1;
        })
   
        $('.form-wizard-block #wizard-prev').on('click', function(e) {
            e.preventDefault();
        
            $(this).parents('.form-wizard-block').prev().addClass('active');
            $(this).parents('.form-wizard-block').removeClass('active');

            tabcount-=1;
        })


		// Custom Style Form Wizard
		var navListItems = $('.custom-form-wizard-block-tab a'),
        allWells = $('.custom-form-wizard-block'),
        allNextBtn = $('.nextBtn');

		allWells.hide();

		navListItems.click(function (e) {
			e.preventDefault();
			var $target = $($(this).attr('href')),
				$item = $(this);

			if (!$item.hasClass('disabled')) {
				navListItems.removeClass('btn-success').addClass('btn-default');
				$item.addClass('btn-success');
				allWells.hide();
				$target.show();
				$target.find('input:eq(0)').focus();
			}
		});

		allNextBtn.click(function () {
			var curStep = $(this).closest(".custom-form-wizard-block"),
				curStepBtn = curStep.attr("id"),
				nextStepWizard = $('.custom-form-wizard-block-tab a[href="#' + curStepBtn + '"]').parent().next().children("a"),
				curInputs = curStep.find("input[type='text'],input[type='url']"),
				isValid = true;

			$(".form-group").removeClass("has-error");
			for (var i = 0; i < curInputs.length; i++) {
				if (!curInputs[i].validity.valid) {
					isValid = false;
					$(curInputs[i]).closest(".form-group").addClass("has-error");
				}
			}

			if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');
		});

		$('.custom-form-wizard-block-tab a.btn-success').trigger('click');



		// Tab Style Form Wizard
		$(".tabstyle-form-wizard-block #wizard-next").on('click', function() {
			const nextTabLinkEl = $(".nav-tabs .active")
				.closest("li")
				.next("li")
				.find("a")[0];
			const nextTab = new bootstrap.Tab(nextTabLinkEl);
			nextTab.show();
		});
	
		$(".tabstyle-form-wizard-block #wizard-prev").on('click', function() {
			const prevTabLinkEl = $(".nav-tabs .active")
				.closest("li")
				.prev("li")
				.find("a")[0];
			const prevTab = new bootstrap.Tab(prevTabLinkEl);
			prevTab.show();
		});	


		// TinyMCE
		tinymce.init({
			selector: '#defaulttextarea',
			height: 200,
			toolbar_location: 'bottom',
			toolbar_sticky: false,
		});
		
			
		// Color Switcher
		var colorSwitcher = false;
		$("#colorSwitch, #colorSwitch2, #colorSwitch3, #colorSwitch4").on('change', function() {
			if ($(this).is(':checked')) {
				colorSwitcher = $(this).is(':checked');
				$('body').addClass('dark-mode');
				$('body').removeClass('bg-light');
			}
			else {
			colorSwitcher = $(this).is(':checked');
				$('body').addClass('bg-light');
				$('body').removeClass('dark-mode');
			}
		});

		// Navigation Styles
		$("input[name=checkLayout]:radio").on('click', function(e) {
			if (e.currentTarget.value == "vertical") {
				$('body').addClass('layout-vertical-nav');
				$('body').removeClass('layout-horizontal-nav layout-combo-nav kleon-vertical-nav--collapse');
		  
			} else if (e.currentTarget.value == "horizontal") {
				$('body').addClass('layout-horizontal-nav');
				$('body').removeClass('layout-vertical-nav layout-combo-nav kleon-vertical-nav--collapse');
		  
			} else if (e.currentTarget.value == "combo") {
				$('body').addClass('layout-combo-nav kleon-vertical-nav--collapse');
				$('body').removeClass('layout-vertical-nav layout-horizontal-nav');
		  
			}
		});

		// Vertical Navigation Styles
		$("input[name=checkVerticalNav]:radio").on('click', function(e) {
			if (e.currentTarget.value == "fullwidth") {
				$('body').addClass('kleon-vertical-nav--fullwidth');
				$('body').removeClass('kleon-vertical-nav--collapse');
		  
			} else if (e.currentTarget.value == "collapse") {
				$('body').addClass('kleon-vertical-nav--collapse');
				$('body').removeClass('kleon-vertical-nav--fullwidth');

			}
		});

		// Vertical Navigation Styles
		$("input[name=headerPosition]:radio").on('click', function(e) {
			if (e.currentTarget.value == "scrollable") {
				$('body').addClass('forScrollableNav');
				$('body').removeClass('forFixedNav');
		  
			} else if (e.currentTarget.value == "fixed") {
				$('body').addClass('forFixedNav');
				$('body').removeClass('forScrollableNav');

			}
		});

		// Datepickr / Flatpicker
		$(".flatpickr").flatpickr({
			// mode: "range",
			dateFormat: "d-M-Y",
			defaultDate: ["08-Aug-2023"],
			minDate: "today",
			// enableTime: true,
		});

		$(".flatpickr-inline").flatpickr({
			// mode: "range",
			dateFormat: "d-M-Y",
			defaultDate: ["08-Aug-2023"],
			minDate: "today",
			inline: true, // Display the calendar in an always-open state with the inline option.
			// enableTime: true,
		});
		

		// Bootstrap Form Validation
        var forms = document.querySelectorAll('.needs-validation')
        Array.prototype.slice.call(forms)
          .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })

        // Jquery Form Validation
        // $("#custom-form-validation").validate();

		// Sticky Header
        var header = $("header");
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();

            if (scroll >= 50) {
                header.addClass("sticky");
            } else {
                header.removeClass("sticky");
            }
        });


		// Theme Customizer Panel
        $('.aside_open').on("click", function(e) {
            e.preventDefault();
            $('.aside_info_wrapper').addClass('show');
        });
        $('.aside_close').on("click", function(e) {
            e.preventDefault();
            $('.aside_info_wrapper').removeClass('show');
        });

		$(".kleon-vertical-nav").niceScroll({
			// z-index
			zindex: "auto",

			// opacity when cursor is inactive
			cursoropacitymin: 0,

			// opacity when cursor is active
			cursoropacitymax: 1,

			// cursor color
			cursorcolor: "#C2C2C2",

			// cursor width
			cursorwidth: "4px",

			// cursor border properties
			cursorborder: "",
			cursorborderradius: "5px",

			// animation speed of smooth scroll
			scrollspeed: 100,   
			autohidemode: true,

		});

	});	
})(jQuery);

// Invoice Print
function printDiv(printCard) {
	var printContents = document.getElementById(printCard).innerHTML;
	var originalContents = document.body.innerHTML;

	document.body.innerHTML = printContents;

	window.print();

	document.body.innerHTML = originalContents;
}

// Hide header on scroll down
const nav = document.querySelector(".header");
const horizontalnav = document.querySelector(".kleon-horizontal-nav");
const scrollUp = "top-up";
let lastScroll = 500;

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 500) {
        nav.classList.remove(scrollUp);
        horizontalnav.classList.remove(scrollUp);
        return;
    }
    
    if (currentScroll > lastScroll) {
        // down
        nav.classList.add(scrollUp);        
        horizontalnav.classList.add(scrollUp);  

    } else if (currentScroll < lastScroll) {
        // up
        nav.classList.remove(scrollUp);        
        horizontalnav.classList.remove(scrollUp); 
    }
    lastScroll = currentScroll;
});