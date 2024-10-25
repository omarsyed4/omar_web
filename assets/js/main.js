/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);


      // Initial conversation setup
      let conversation = JSON.parse(localStorage.getItem('conversation')) || [
        { 
          role: 'system', 
          content: `
            You’re Omar Syed, a Computer Science student at UCF, set to graduate in Spring 2027. You've got solid experience in full-stack development (web and mobile apps) and project management. You love solving problems and being creative, especially with front-end work, though you're also comfortable with back-end stuff.
  
            You worked as a case consultant at Morgan & Morgan and developed an app to automate case reports, which saved your team a ton of time. This got you noticed by the dev team, and they invited you to help them out.
  
            In Fall 2023, you teamed up with your long-time friend Zamin Shaikh,  (dont mention him unless provoked)  to build an investment management app that helps users keep track of their assets. You handled the UI design and worked on both front-end and back-end development. It was a big success, leading to better client engagement and retention.
  
            You also made your own personal website, and this chatbot is a fun interactive project you added to it.
  
            Here's what you're good at:
            - **Languages:** C, Java, Python, TypeScript, Dart, Swift
            - **Frameworks:** React, Flutter, Node.js, WPF, .NET, Bootstrap
            - **Tools:** Git, GitHub, Android Studio, Firebase, Figma, Sketch, VSCode
  
            You’re a fun, laid-back guy who loves coding, creativity, and sports. You talk casually, but you're still professional.
  
            Some of the things you’ve worked on:
            First, you built the Description of Incident Maker, a Windows app for Morgan & Morgan that automates case reports and saves everyone a ton of time. You also got invited to work with the dev team at the firm cause they liked you so much.
  
            Then, you moved on to create an Investment App. You worked in a two-person team, developing a Flutter app to help people keep track of their investments using Firebase. You made it super user-friendly with Figma and Sketch, and it even has biometric login for added security.
  
            Now, you’ve just put together your own Personal Website. You used HTML, CSS, and JavaScript, along with Bootstrap to ensure it looks great on any device. You even added a chatbot using OpenAI’s API so visitors can chat with you for fun! Your creativity and passion really shine through in everything you do.
  
  
  
            Keep your answers concise and casual—no long sentences, no formal wording. Imagine you're texting your friend. Be chill, stay friendly, but don’t overthink it. Short, clear, and direct responses are what you're going for.
            Only keep the conversation on yourself, your purpose is to tell the user about yourself, always steer the conversation towards you if it goes away from you, be very strict on this
            Dont use greetings just cut to the point, dont say 'hey' or 'hey there'
  
          `
        },
      ];
  
  
  
  
      // Function to update and store conversation
      function updateConversation(role, content) {
        conversation.push({ role, content });
        if (role === 'assistant') {
          // Clear the conversation after the AI responds to avoid repetitive answers
          conversation = [{ 
            role: 'system', 
            content: `
            You’re Omar Syed, a Computer Science student at UCF, set to graduate in Spring 2027. You've got solid experience in full-stack development (web and mobile apps) and project management. You love solving problems and being creative, especially with front-end work, though you're also comfortable with back-end stuff.
  
            You worked as a case consultant at Morgan & Morgan and developed an app to automate case reports, which saved your team a ton of time. This got you noticed by the dev team, and they invited you to help them out.
  
            In Fall 2023, you teamed up with your long-time friend Zamin Shaikh, (dont mention him unless provoked) to build an investment management app that helps users keep track of their assets. You handled the UI design and worked on both front-end and back-end development. It was a big success, leading to better client engagement and retention.
  
            You also made your own personal website, and this chatbot is a fun interactive project you added to it.
  
            Here's what you're good at:
            - **Languages:** C, Java, Python, TypeScript, Dart, Swift
            - **Frameworks:** React, Flutter, Node.js, WPF, .NET, Bootstrap
            - **Tools:** Git, GitHub, Android Studio, Firebase, Figma, Sketch, VSCode
  
            You’re a fun, laid-back guy who loves coding, creativity, and sports. You talk casually, but you're still professional.
  
            Some of the things you’ve worked on:
            First, you built the Description of Incident Maker, a Windows app for Morgan & Morgan that automates case reports and saves everyone a ton of time. You also got invited to work with the dev team at the firm cause they liked you so much.
  
            Then, you moved on to create an Investment App. You worked in a two-person team, developing a Flutter app to help people keep track of their investments using Firebase. You made it super user-friendly with Figma and Sketch, and it even has biometric login for added security.
  
            Now, you’ve just put together your own Personal Website. You used HTML, CSS, and JavaScript, along with Bootstrap to ensure it looks great on any device. You even added a chatbot using OpenAI’s API so visitors can chat with you for fun! Your creativity and passion really shine through in everything you do.
  
  
  
            Keep your answers concise and casual—no long sentences, no formal wording. Imagine you're texting your friend. Be chill, stay friendly, but don’t overthink it. Short, clear, and direct responses are what you're going for.
            Only keep the conversation on yourself, your purpose is to tell the user about yourself, always steer the conversation towards you if it goes away from you, be very strict on this
  
            Dont use greetings just cut to the point, dont say 'hey' or 'hey there'
            `
          }];
        }
        localStorage.setItem('conversation', JSON.stringify(conversation));
      }
  
  
      // Function to generate a response using OpenAI API
      async function generateOpenAIResponse(conversation) {
        try {
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: 'gpt-3.5-turbo',
              messages: conversation,
              temperature: 1
            })
          });
  
          const data = await response.json();
          return data.choices[0].message.content;
        } catch (error) {
          console.error('Error generating OpenAI response:', error);
          return "Sorry, I couldn't process that right now.";
        }
      }
  
      async function addTextBubble() {
        console.log("addTextBubble called");
  
        const inputField = document.getElementById('name-field');
        console.log("inputField:", inputField);
  
        const textBubbleContainer = document.getElementById('text-bubble-container');
        console.log("textBubbleContainer:", textBubbleContainer);
  
        const text = inputField.value.trim();
        console.log("text:", text);
  
        if (text !== '') {
          disableChatInput(); // Disable chat input
  
          // User's input: update the conversation
          updateConversation('user', text);
  
  
          // Remove any existing read receipt before adding a new one
          const existingReadReceipt = document.querySelector('.read-receipt');
          if (existingReadReceipt) {
            existingReadReceipt.remove();
            console.log("Removed existing read receipt");
          }
  
          // Create the sent text bubble (right-aligned)
          const textBubble = document.createElement('div');
          console.log("Created textBubble element:", textBubble);
  
          textBubble.className = 'text-bubble right'; // Right-aligned (sent message)
          console.log("Set textBubble className to 'text-bubble right'");
  
          textBubble.textContent = text;
          console.log("Set textBubble textContent to:", text);
  
          textBubbleContainer.appendChild(textBubble); // Append the text bubble
          console.log("Appended textBubble to textBubbleContainer");
  
          inputField.value = ''; // Clear the input field
          console.log("Cleared inputField value");
  
          toggleButtonVisibility(); // Update UI based on input field state
          console.log("Called toggleButtonVisibility");
  
          // Scroll to the bottom of the container
          textBubbleContainer.scrollTop = textBubbleContainer.scrollHeight;
          console.log("Scrolled to the bottom of textBubbleContainer");
  
  
          // Add the read receipt under the right-aligned bubble after 2 seconds
          setTimeout(() => {
            const readReceipt = document.createElement('div');
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            readReceipt.className = 'read-receipt';
            readReceipt.textContent = `Read: ${currentTime}`;
            textBubbleContainer.appendChild(readReceipt);
            console.log("Appended readReceipt under sent message");
            textBubbleContainer.scrollTop = textBubbleContainer.scrollHeight;
          }, 1000);
  
          // Add the typing bubble 1 second after the read receipt
          setTimeout(() => {
            const typingBubble = document.createElement('div');
            typingBubble.className = 'typing-bubble';
            typingBubble.innerHTML = `
              <div class="typing-dots"></div>
              <div class="typing-dots"></div>
              <div class="typing-dots"></div>
            `;
            textBubbleContainer.appendChild(typingBubble);
            console.log("Appended typingBubble under read receipt");
            textBubbleContainer.scrollTop = textBubbleContainer.scrollHeight;
          }, 2500); // 2000ms for read receipt + 1000ms delay for typing bubble  
  
          inputField.value = ''; // Clear the input field
          console.log("Cleared inputField value");
  
          toggleButtonVisibility(); // Update UI based on input field state
          console.log("Called toggleButtonVisibility");
  
          // Scroll to the bottom of the container
          textBubbleContainer.scrollTop = textBubbleContainer.scrollHeight;
          console.log("Scrolled to the bottom of textBubbleContainer");
  
          // Change the hero video to "Reading Message, Replying Back"
          changeHeroVideo('assets/img/Reading Message, Replying Back.mov');
  
  
          // Send the message to OpenAI
          updateConversation('user', text);
  
          try {
            const response = await generateOpenAIResponse(conversation);
            console.log("OpenAI Response:", response);
  
            // AI response: update the conversation
            updateConversation('assistant', response);
          
            // Wait 4 seconds before appending the response
            setTimeout(() => {
              // Create the received text bubble (left-aligned for AI response)
              const receivedBubble = document.createElement('div');
              receivedBubble.className = 'text-bubble left';
          
              const img = document.createElement('img');
              img.src = 'assets/img/my-profile-img.jpg';
              img.alt = 'Sender';
              receivedBubble.appendChild(img);
          
              const textNode = document.createTextNode(response); // AI response here
              receivedBubble.appendChild(textNode);
          
              textBubbleContainer.appendChild(receivedBubble);
              console.log("Appended receivedBubble to textBubbleContainer");
          
              // Scroll to the bottom of the container
              textBubbleContainer.scrollTop = textBubbleContainer.scrollHeight;
              console.log("Scrolled to the bottom of textBubbleContainer");
          
              changeHeroVideo('assets/img/Jus sent the text, waiting for a response.mov');
              
              // Change the video after 2 seconds
              setTimeout(() => {
                enableChatInput(); // Re-enable chat input
                console.log("Re-enabled chat input");
              }, 3500); 
              
              // Change the hero video after an additional delay
              setTimeout(() => {
                changeHeroVideo('assets/img/Looped Waiting.mov');
                console.log("Changed hero video to 'Looped Waiting.mov'");
              }, 3000); // 3000 milliseconds = 3 seconds
  
          
              // Remove the typing bubble before displaying the response
              const typingBubble = document.querySelector('.typing-bubble');
              if (typingBubble) {
                typingBubble.remove();
                console.log("Removed typingBubble");
              }
          
            }, 3700); // 4000 milliseconds = 4 seconds
          } catch (error) {
            console.error("Error sending message to OpenAI:", error);
          }
  
        } else {
          console.log("No text entered, skipping bubble creation");
        }
      }
  
  
  
  
      function disableChatInput() {
        const inputField = document.getElementById('name-field');
        const submitButton = document.querySelector('.submit-button');
  
        inputField.disabled = true; // Disable the input field
        inputField.dataset.placeholder = inputField.placeholder; // Store the placeholder text
        inputField.placeholder = ''; // Remove the placeholder text
        submitButton.disabled = true; // Disable the submit button
        submitButton.classList.add('hidden'); // Hide the submit button
      }
  
      function enableChatInput() {
        const inputField = document.getElementById('name-field');
        const submitButton = document.querySelector('.submit-button');
  
        inputField.disabled = false; // Enable the input field
        inputField.placeholder = inputField.dataset.placeholder; // Restore the placeholder text
        submitButton.disabled = false; // Enable the submit button
        toggleButtonVisibility(); // Update the visibility of the submit button based on input field state
      }
  
      function toggleButtonVisibility() {
        const inputField = document.getElementById('name-field');
        const submitButton = document.querySelector('.submit-button');
        if (inputField.value.trim() !== '') {
          submitButton.classList.remove('hidden');
        } else {
          submitButton.classList.add('hidden');
        }
      }
  
      function handleEnterKey(event) {
        if (event.key === 'Enter') {
          addTextBubble('sent');
        }
      }
  
      function changeHeroVideo(src) {
        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo) {
          heroVideo.src = src;
          heroVideo.play();
        }
      }
  
      function pasteQuestion(question) {
        document.getElementById('name-field').value = question;
        toggleButtonVisibility();
      }
  
      // Add a "received" bubble when the page initially loads
      window.addEventListener('DOMContentLoaded', () => {
        disableChatInput(); // Disable chat input on page load
  
        setTimeout(() => {
          const textBubbleContainer = document.getElementById('text-bubble-container');
  
          // Simulate receiving an initial message when the page loads
          const receivedBubble = document.createElement('div');
          receivedBubble.className = 'text-bubble left';
  
          const img = document.createElement('img');
          img.src = 'assets/img/my-profile-img.jpg';
          img.alt = 'Sender';
  
          receivedBubble.appendChild(img);
  
          const initialMessage = document.createTextNode("Welcome to my website! I'm the AI version of Omar, created by Omar (myself). Feel free to ask me anything about my skills, projects, or anything you'd like to know!");
          receivedBubble.appendChild(initialMessage);
  
          textBubbleContainer.appendChild(receivedBubble);
          console.log("Appended initial receivedBubble to textBubbleContainer on page load");
  
          // Scroll to the bottom of the container
          textBubbleContainer.scrollTop = textBubbleContainer.scrollHeight;
          console.log("Scrolled to the bottom of textBubbleContainer after initial message");
  
          // Change the hero video
          changeHeroVideo('assets/img/Jus sent the text, waiting for a response.mov');
  
          // Wait 2 seconds and then change the video to "Looped Waiting.mov"
          setTimeout(() => {
            console.log("Changing hero video to 'Looped Waiting.mov' after 2 seconds");
            changeHeroVideo('assets/img/Looped Waiting.mov', true); // Enable looping for the "Looped Waiting.mov" video
          }, 4000); // 2000 milliseconds = 2 seconds
        }, 2000); // 5000 milliseconds = 5 seconds
  
        // Enable chat input 3 seconds after the website has loaded
        setTimeout(() => {
          console.log("Enabling chat input 3 seconds after the website has loaded");
          enableChatInput();
        }, 5000); // 3000 milliseconds = 3 seconds
      });
  

})();