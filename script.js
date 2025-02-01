document.addEventListener("DOMContentLoaded", function () {
  let users = []; // Initialize an empty array to store user data

  // Function to fetch user data from users.json
  async function fetchUsers() {
    try {
      const response = await fetch("users.json"); // Fetch the JSON file
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      users = await response.json(); // Parse the JSON data
      displayPartners(users); // Display partners after fetching data
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  // Function to display available partners
  function displayPartners(filteredUsers = users) {
    const partnersContainer = document.getElementById("skillsContainer");
    partnersContainer.innerHTML = ""; // Clear previous content

    if (filteredUsers.length === 0) {
      partnersContainer.innerHTML = `<p>No users found with this skill.</p>`;
      return;
    }

    filteredUsers.forEach((user) => {
      const partnerCard = document.createElement("div");
      partnerCard.classList.add("skill-card");

      // Display all skills for the user
      const skillsList = user.skills
        .map((skill) => `<li>${skill}</li>`)
        .join("");

      partnerCard.innerHTML = `
                <h3>${user.name}</h3>
                <p><strong>Skills:</strong></p>
                <ul>${skillsList}</ul>
                <p><strong>Location:</strong> ${user.location}</p>
                <button class="message-btn">Message</button>
            `;

      partnersContainer.appendChild(partnerCard);
    });
  }

  // Function to search for users by skill
  function searchSkills() {
    const searchQuery = document
      .getElementById("searchInput")
      .value.toLowerCase();

    const filteredUsers = users.filter((user) =>
      user.skills.some((skill) => skill.toLowerCase().includes(searchQuery))
    );

    displayPartners(filteredUsers);
  }

  // Sidebar Navigation Functionality
document.querySelectorAll(".sidebar ul li").forEach((item) => {
    item.addEventListener("click", function () {
        // Hide all sections
        document.querySelectorAll("main section").forEach((section) => {
            section.style.display = "none";
        });

        // Show the correct section based on clicked item
        if (this.textContent.includes("Home")) {
            document.querySelector(".home").style.display = "flex";
        } else if (this.textContent.includes("Find a Partner")) {
            document.getElementById("skillList").style.display = "block";
        } else if (this.textContent.includes("Messages")) {
            document.getElementById("messages").style.display = "block";
        } else if (this.textContent.includes("Profile")) {
            document.getElementById("profile").style.display = "block";  // Ensure this targets the correct section
        }
    });
});


  // Event listener for "Explore Skills" button
  document
    .getElementById("exploreBtn")
    .addEventListener("click", () => displayPartners(users));

  // Fetch user data when the page loads
  fetchUsers();

  // Make searchSkills function globally accessible
  window.searchSkills = searchSkills;
});

document.addEventListener("DOMContentLoaded", function () {
  const messageContainer = document.getElementById("messageContainer");
  const messageInput = document.getElementById("messageInput");
  const sendMessageBtn = document.getElementById("sendMessageBtn");

  let messages = [
    { sender: "You", content: "Hey, how are you?", time: "10:30 AM" },
    {
      sender: "Alice",
      content: "I'm good, thanks! How about you?",
      time: "10:32 AM",
    },
    { sender: "You", content: "I'm doing great!", time: "10:35 AM" },
  ];

  // Function to display the messages in the chat container
  function displayMessages() {
    messageContainer.innerHTML = ""; // Clear previous messages

    messages.forEach((message) => {
      const messageElement = document.createElement("div");
      messageElement.classList.add("message");

      // Check the sender and apply the respective class for styling
      if (message.sender === "You") {
        messageElement.classList.add("sent");
        messageElement.innerHTML = `
                    <div class="message-content">${message.content}</div>
                    <span class="message-time">${message.time}</span>
                `;
      } else {
        messageElement.classList.add("received");
        messageElement.innerHTML = `
                    <div class="message-content">${message.content}</div>
                    <span class="message-time">${message.time}</span>
                `;
      }

      messageContainer.appendChild(messageElement);
    });

    // Scroll to the bottom when a new message is added
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }

  // Event listener for sending a new message
  sendMessageBtn.addEventListener("click", () => {
    const messageText = messageInput.value.trim();
    if (messageText) {
      const newMessage = {
        sender: "You",
        content: messageText,
        time: new Date().toLocaleTimeString(),
      };

      messages.push(newMessage);
      messageInput.value = ""; // Clear input
      messageInput.focus(); // Refocus the input
      displayMessages();
    }
  });

  // Initial display of messages
  displayMessages();
});
document.addEventListener("DOMContentLoaded", function () {
    // Initialize the user data and recent partners list
    let user = {
      name: "Back Benchers",
      profilePicture: "./images/profile-icon-png-898.png",
      skills: ["JavaScript", "Python", "HTML/CSS"],
      recentPartners: ["Abhi", "Chaithanya", "Praneeth"]
    };
  
    // Display user information
    document.getElementById("userName").textContent = user.name;
    document.getElementById("profile-image").innerHTML = `<img src="${user.profilePicture}" alt="Profile Picture" />`;
  
    // Display user's skills
    const skillsList = document.getElementById("skillsList");
    user.skills.forEach(skill => {
      const skillItem = document.createElement("li");
      skillItem.textContent = skill;
      skillsList.appendChild(skillItem);
    });
  
    // Display recent partners
    const partnersList = document.getElementById("partnersList");
    user.recentPartners.forEach(partner => {
      const partnerItem = document.createElement("li");
      partnerItem.textContent = partner;
      partnersList.appendChild(partnerItem);
    });
  
    // Add skill functionality
    const addSkillBtn = document.getElementById("addSkillBtn");
    const skillInputSection = document.getElementById("skillInputSection");
    const newSkillInput = document.getElementById("newSkillInput");
    const saveSkillBtn = document.getElementById("saveSkillBtn");
    const cancelSkillBtn = document.getElementById("cancelSkillBtn");
  
    addSkillBtn.addEventListener("click", () => {
      skillInputSection.style.display = "flex"; // Show the input section
    });
  
    cancelSkillBtn.addEventListener("click", () => {
      skillInputSection.style.display = "none"; // Hide the input section
      newSkillInput.value = ""; // Clear the input
    });
  
    saveSkillBtn.addEventListener("click", () => {
      const newSkill = newSkillInput.value.trim();
      if (newSkill) {
        user.skills.push(newSkill);
        const skillItem = document.createElement("li");
        skillItem.textContent = newSkill;
        skillsList.appendChild(skillItem);
      }
      skillInputSection.style.display = "none"; // Hide the input section
      newSkillInput.value = ""; // Clear the input
    });
  });
  document.getElementById("exploreBtn").addEventListener("click", () => {
    // This will directly show the profile page instead of just displaying skills.
    document.querySelectorAll("main section").forEach((section) => {
        section.style.display = "none"; // Hide all sections
    });

    document.getElementById("profile").style.display = "block";  // Show Profile section
});
