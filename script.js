// Navigation & Mobile Menu Logic
const mobile_menu_button = document.querySelector('.mobile_menu_button');
const nav_list = document.querySelector('.nav_list');
const nav_links = document.querySelectorAll('.nav_link');

// Toggle mobile menu visibility
function toggle_mobile_menu() {
    const is_expanded = mobile_menu_button.getAttribute('aria-expanded') === 'true';
    mobile_menu_button.setAttribute('aria-expanded', !is_expanded);
    
    mobile_menu_button.classList.toggle('mobile_menu_active_btn');
    nav_list.classList.toggle('mobile_menu_active');
}

if (mobile_menu_button) {
    mobile_menu_button.addEventListener('click', toggle_mobile_menu);
}

// Close mobile menu when a navigation link is clicked
nav_links.forEach(function(link) {
    link.addEventListener('click', function() {
        if (nav_list && nav_list.classList.contains('mobile_menu_active')) {
            toggle_mobile_menu();
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (nav_list && nav_list.classList.contains('mobile_menu_active')) {
        if (!nav_list.contains(event.target) && !mobile_menu_button.contains(event.target)) {
            toggle_mobile_menu();
        }
    }
});


// Theme Toggle Logic
const theme_toggle = document.getElementById('theme_toggle');
const profile_image = document.getElementById('profile_image');

function swap_profile_image(new_src) {
    if (!profile_image || profile_image.getAttribute('src') === new_src) return;
    
    profile_image.classList.add('image_fading');
    
    // Wait for the fade out transition before changing src
    setTimeout(function() {
        profile_image.src = new_src;
        
        // Remove the fade class once the new image is loaded
        profile_image.onload = function() {
            profile_image.classList.remove('image_fading');
        };
        
        // Fallback timeout in case onload doesn't trigger quickly
        setTimeout(function() {
            profile_image.classList.remove('image_fading');
        }, 150);
        
    }, 300); // matches the 0.3s CSS transition
}

function set_theme(is_dark) {
    if (is_dark) {
        document.documentElement.classList.add('dark_mode');
        localStorage.setItem('theme_preference', 'dark_mode');
        swap_profile_image('assets/Dark.jpg');
        
        if (theme_toggle) {
            theme_toggle.setAttribute('aria-label', 'switch to light mode');
        }
    } else {
        document.documentElement.classList.remove('dark_mode');
        localStorage.setItem('theme_preference', 'light_mode');
        swap_profile_image('assets/me.jpg');
        
        if (theme_toggle) {
            theme_toggle.setAttribute('aria-label', 'switch to dark mode');
        }
    }

    if (typeof render_ascii_portrait === 'function') {
        render_ascii_portrait();
    }
}

if (theme_toggle) {
    // Initialize aria-label on load based on current state
    const is_currently_dark = document.documentElement.classList.contains('dark_mode');
    theme_toggle.setAttribute('aria-label', is_currently_dark ? 'switch to light mode' : 'switch to dark mode');
    
    // Listen for toggle clicks
    theme_toggle.addEventListener('click', function() {
        const is_dark = document.documentElement.classList.contains('dark_mode');
        set_theme(!is_dark);
    });
}


// Intersection Observer for Smooth Section Entrances
const entrance_animation_options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const entrance_observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('is_visible');
            // Stop observing once the animation has triggered
            observer.unobserve(entry.target);
        }
    });
}, entrance_animation_options);

const fade_in_elements = document.querySelectorAll('.fade_in_element');
fade_in_elements.forEach(function(element) {
    entrance_observer.observe(element);
});


// Active Navigation Link Highlight based on Scroll Position
const page_sections = document.querySelectorAll('.page_section');

const scroll_spy_options = {
    root: null,
    // Trigger when a section takes up roughly the middle part of the screen
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0
};

const scroll_spy_observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            const active_section_id = entry.target.id;
            
            nav_links.forEach(function(link) {
                // Remove active class from all links
                link.classList.remove('active_link');
                
                // Add active class if the link's href matches the current section
                if (link.getAttribute('href') === '#' + active_section_id) {
                    link.classList.add('active_link');
                }
            });
        }
    });
}, scroll_spy_options);

page_sections.forEach(function(section) {
    scroll_spy_observer.observe(section);
});




// ASCII Portraits Data
const ASCII_PORTRAITS = {
    me: "                  ..'.         '..                  \n                 .    \"i?)({?I.   .                 \n                .  ~ub@$$$$$$$aU-  .                \n               . _p$$8hOCQqkhW$$$b] .               \n              . |$%u)?i;;Ii-]{/vm$$Y .              \n             ..'M$u{\\}+<<<~-]{/t/z%$< .             \n             . !&br\\}+>!>~~~+[|rcck$1 '             \n             . +LfJmwmQYn/fvJZZwm0Ua]..             \n             ..izY#$$$$$&Xp$$$$$$Wq0, .             \n            . 1ZctvwhWobm[YM&$$$@#pLXI .            \n            . lCn)~>?)\\r);{JXvcnxzcba,..            \n              '{frrvcYCY0OwmwLnj\\uYh[ .             \n              .;(UCCvj(QhB$%pJQmmZL{ .              \n              . ,JQXXmdpmda##hO0qb- .               \n               . ~OqZCJmbaaapqbdp) .                \n               .. c#bOYczXYCOdaMU ..                \n          ...'. .;x8B8M&&8%%BB8@X;  .'...           \n     ..''.     _q_,c&$$@$$$$$$BOItLi     .''..      \n..''.     `!}nb$$i  >v#$$$$$%Q]. |$@qn{i^     .''.. \n     `>)zwM$$$$@$c.'  `[w#k/I  .\"b$$$$$$MqX|<^      \n\">1umM$$$$$$$@$$$a .. ,na#ox^ '.{$$$$@$$$$$$$Wqz\\_: \n&$$$$$$$@$$$$$$$$B! `}q$$$$$b]' |$$$$$$$$$@@$$$$$$%k\n$$$@$$$$$$$$$$$$$$}`<|]?%$O~++I`u$@$$$$$$$$$$$$@@$$$\n$$$$$$$$$$$$$$$$@$z..  )$$d   '.O$$$$$$$$$$$$$$$$$$$\n$$$$$$$$$$$$$$$$$$a...IB$@$L.'.\"8$$$$$$$$$$$$$$$$$$$\n$$$$$$$$$$$$$$$$$$$+  /$@$$$I  1$$$$$$$$$$$$$$$$$$$$",
    dark: "                    .'       ..                     \n                  ..   ,i~>:.  ..                   \n                    _C#$$$$$&O?                     \n                ..\"QBMwUYJCZpW$O,..                 \n                ' J%i,   `;!~+X$X.'                 \n                . Lu;;..\"::i-[)Qz .         .  .    \n   ..           . l-nvf\\1(nLdhOt|\"                  \n                . ?pB$$$hu$$$$$Ofn .       `:.^\"    \n  .;+..         . _bW&$@/'uM$@Wxr_ .     ..`->I)` . \n. '(<            . !UpwxxQLQmQct! .          I-(}'. \n `]_'^^'          . ?j|xQwhpLcX1 '.     `l;liI]tc; `\n.I[{+_],.          .`}v\\tzYuu0k1   ''.. `lIi~~i+t|{,\n\",?(]|:         ..'.  {0YQOb&WJ;nt'    .'^\"I>i}cQQ\\ \n;+}f1~ .   .''.     ^)ifZk#hu< <B$az)i`     I|UOwZ-.\n^]))r?..  .     I]nm#$< jpn`  :M$@$$$$#wX(_:;)uULZ< \n~rQYt`.. . \"{jLhB$$$$@>{&$M['.Q$@$$@$$$$$$$%*LQXjn~\"\nl_)tc\". ' ^o$$$$$$@@$%I'0@!' [$@$$$$$$$$@$$$$ci;` !d\n\\nL#$~ ' \"L$@@@$$$$$$$I!@$_.^*$$$$$$$$$$$$$$$BqCCb@$\n$$$$$\\. ~a$$$$$$$$$$$$+Y$$/ U$@$$$$$$$$$$$$$$$$$$$$$\n$@$@$u -a$@$$$$$$$$$$$rb$$)+$@$$$@8W#@$$$$$$$$$$$$$$\n$$$$$&J$$$$$$$$$$$$$$$a&$$jo$$MLQQQOq@$$$$$$$$$$$$$$\n$$$$$$$$$$$$$$$$$$$$$$$$$$*$$$@B$$$$$$$$$$$$$$$$$$$$\n$$$$$$@$$$$@$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$\n$$$$$$$$$$$$@B$$$$$$$$$$$$$$$$$$$$$$$$$$$cM$$$$$$$$$\n$$$$$$$$$$*z!c$@$$$$$$$$$$$$$$$$$$$$$$$$8 +b$$$$$$$$\nW$$$$$$Bq(^  _$$$$$$$$$$$$$$$$$$$$$$$$$$k' ^Z$$$$$$$"
};

// Render ASCII Portrait based on current theme
const ascii_art_element = document.getElementById('ascii_art');
const ascii_toggle_btn = document.getElementById('ascii_toggle_btn');

function render_ascii_portrait() {
    if (!ascii_art_element) return;
    const is_dark = document.documentElement.classList.contains('dark_mode');
    ascii_art_element.textContent = is_dark ? ASCII_PORTRAITS.dark : ASCII_PORTRAITS.me;
}

// Initialize ASCII portrait on page load
render_ascii_portrait();

// ASCII / Photo Mode Toggle
if (ascii_toggle_btn) {
    ascii_toggle_btn.addEventListener('click', function () {
        const is_photo_active = !profile_image.classList.contains('photo_hidden');
        if (is_photo_active) {
            // Switch to ASCII
            profile_image.classList.add('photo_hidden');
            ascii_art_element.classList.remove('ascii_hidden');
            ascii_toggle_btn.innerHTML = '<span class="toggle_icon">📷</span> <span class="toggle_text">Photo</span>';
            ascii_toggle_btn.setAttribute('aria-label', 'Switch to Photo view');
        } else {
            // Switch to Photo
            profile_image.classList.remove('photo_hidden');
            ascii_art_element.classList.add('ascii_hidden');
            ascii_toggle_btn.innerHTML = '<span class="toggle_icon">⚡</span> <span class="toggle_text">ASCII</span>';
            ascii_toggle_btn.setAttribute('aria-label', 'Switch to ASCII view');
        }
    });
}


// Projects Filter Logic
const filter_pills = document.querySelectorAll('.filter_pill');
const project_cards = document.querySelectorAll('.project_card');

if (filter_pills.length > 0) {
    filter_pills.forEach(function (pill) {
        pill.addEventListener('click', function () {
            filter_pills.forEach(function (p) {
                p.classList.remove('active');
                p.setAttribute('aria-selected', 'false');
            });
            pill.classList.add('active');
            pill.setAttribute('aria-selected', 'true');

            const filter_val = pill.getAttribute('data-filter');

            project_cards.forEach(function (card) {
                const categories = card.getAttribute('data-category') || '';
                if (filter_val === 'all' || categories.includes(filter_val)) {
                    card.classList.remove('card_hidden');
                } else {
                    card.classList.add('card_hidden');
                }
            });
        });
    });
}


// Project Live Preview Modal Logic (Interactive Sandbox)
const preview_modal = document.getElementById('preview_modal');
const modal_iframe = document.getElementById('modal_iframe');
const modal_title = document.getElementById('modal_title');
const modal_loader = document.getElementById('modal_loader');
const modal_external_link = document.getElementById('modal_external_link');
const modal_close_btn = document.getElementById('modal_close_btn');
const modal_backdrop = document.getElementById('modal_backdrop');
const device_buttons = document.querySelectorAll('.device_btn');
const modal_iframe_wrapper = document.getElementById('modal_iframe_wrapper');
const preview_buttons = document.querySelectorAll('.project_preview_btn');

function open_preview_modal(url, title) {
    if (!preview_modal || !modal_iframe) return;

    if (modal_title) modal_title.textContent = title;
    if (modal_external_link) modal_external_link.href = url;

    // Reset device view to desktop
    if (modal_iframe_wrapper) modal_iframe_wrapper.classList.remove('device_mobile');
    device_buttons.forEach(function (btn) {
        btn.classList.toggle('active', btn.getAttribute('data-device') === 'desktop');
    });

    // Show loading spinner
    if (modal_loader) modal_loader.classList.remove('loader_hidden');

    modal_iframe.onload = function () {
        if (modal_loader) modal_loader.classList.add('loader_hidden');
    };

    modal_iframe.src = url;

    preview_modal.classList.add('modal_active');
    preview_modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function close_preview_modal() {
    if (!preview_modal) return;
    preview_modal.classList.remove('modal_active');
    preview_modal.setAttribute('aria-hidden', 'true');
    if (modal_iframe) modal_iframe.src = '';
    document.body.style.overflow = '';
}

// Attach event listeners to Preview buttons
preview_buttons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        const url = btn.getAttribute('data-url');
        const title = btn.getAttribute('data-title');
        open_preview_modal(url, title);
    });
});

// Modal controls
if (modal_close_btn) modal_close_btn.addEventListener('click', close_preview_modal);
if (modal_backdrop) modal_backdrop.addEventListener('click', close_preview_modal);

// Close on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && preview_modal && preview_modal.classList.contains('modal_active')) {
        close_preview_modal();
    }
});

// Device View Switcher (Desktop vs Mobile)
device_buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
        device_buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        const device = btn.getAttribute('data-device');
        if (modal_iframe_wrapper) {
            if (device === 'mobile') {
                modal_iframe_wrapper.classList.add('device_mobile');
            } else {
                modal_iframe_wrapper.classList.remove('device_mobile');
            }
        }
    });
});

