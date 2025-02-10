document.addEventListener("DOMContentLoaded", () => {
    // Get DOM elements
    const loginForm = document.getElementById("login-form")
    const registerForm = document.getElementById("register-form")
    const loginContainer = document.getElementById("login-form-container")
    const registerContainer = document.getElementById("register-form-container")
    const showRegisterLink = document.getElementById("show-register")
    const showLoginLink = document.getElementById("show-login")
    const authView = document.getElementById("auth-view")
    const dashboardView = document.getElementById("dashboard-view")
    const loader = document.getElementById("loader")
    const userAvatar = document.getElementById("user-avatar")
    const userName = document.getElementById("user-name")
    const userRole = document.getElementById("user-role")
    const navList = document.getElementById("nav-list")
    const featuresGrid = document.getElementById("features-grid")
    const statsGrid = document.getElementById("stats-grid")
    const manualSection = document.getElementById("manual-section")
    const hoursSection = document.getElementById("hours-section")
    const currentTime = document.getElementById("current-time")
    const darkModeToggleAuth = document.getElementById("darkmode-toggle-auth")
    const darkModeToggleDashboard = document.getElementById("darkmode-toggle-dashboard")
    const logoutButton = document.getElementById("logout-button")
  
    // Navigation items
    const raNavItems = [
      { icon: "🏠", text: "Dashboard", active: true },
      { icon: "🔄", text: "SwitchMe" },
      { icon: "✓", text: "CheckMate" },
      { icon: "📚", text: "RA Manual" },
      { icon: "⏰", text: "Hours" },
      { icon: "👤", text: "Profile" },
    ]
  
    const managerNavItems = [
      { icon: "🏠", text: "Dashboard", active: true },
      { icon: "👥", text: "Staff Management" },
      { icon: "📋", text: "Rounds Management" },
      { icon: "🧹", text: "Cleaning Checks" },
      { icon: "📊", text: "Reports" },
      { icon: "👤", text: "Profile" },
    ]
  
    // Stats data
    const raStats = [
      { value: "12", label: "Rounds This Month" },
      { value: "95%", label: "Completion Rate" },
      { value: "8", label: "Pending Checks" },
      { value: "4.8", label: "Rating" },
    ]
  
    const managerStats = [
      { value: "24", label: "Active RAs" },
      { value: "156", label: "Monthly Rounds" },
      { value: "98%", label: "Completion Rate" },
      { value: "12", label: "Reports Due" },
    ]
  
    // Feature cards
    const raFeatures = [
      { icon: "🔄", title: "SwitchMe", description: "Switch rounds with other RAs", url: "switchme.html" },
      { icon: "✓", title: "CheckMate", description: "Perform monthly cleaning checks", url: "cleaningchecks.html" },
      { icon: "📅", title: "My Schedule", description: "View your upcoming rounds", url: "schedule.html" },
      { icon: "📝", title: "Submit Report", description: "File your daily reports", url: "report.html" },
    ]
  
    const managerFeatures = [
      {
        icon: "👥",
        title: "Staff Management",
        description: "Manage RAs and staff members",
        url: "staff-management.html",
      },
      {
        icon: "📋",
        title: "Rounds Management",
        description: "Oversee and approve round switches",
        url: "rounds-management.html",
      },
      {
        icon: "🧹",
        title: "Cleaning Checks",
        description: "Review submitted cleaning checks",
        url: "cleaningchecks.html",
      },
      { icon: "📊", title: "Reports", description: "Generate and view reports", url: "reports.html" },
    ]
  
    // Toggle between login and register forms
    showRegisterLink.addEventListener("click", (e) => {
      e.preventDefault()
      loginContainer.style.display = "none"
      registerContainer.classList.add("visible")
    })
  
    showLoginLink.addEventListener("click", (e) => {
      e.preventDefault()
      registerContainer.classList.remove("visible")
      loginContainer.style.display = "block"
    })
  
    function updateCurrentTime() {
      const now = new Date()
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
      currentTime.textContent = now.toLocaleDateString("en-US", options)
    }
  
    function showLoader() {
      loader.classList.add("visible")
    }
  
    function hideLoader() {
      loader.classList.remove("visible")
    }
  
    function renderNavItems(items) {
      navList.innerHTML = items
        .map(
          (item) => `
              <li class="nav-item">
                  <a href="#" class="nav-link ${item.active ? "active" : ""}" data-nav="${item.text.toLowerCase()}">
                      <span>${item.icon}</span>
                      ${item.text}
                  </a>
              </li>
          `,
        )
        .join("")
  
      // Add click handlers for navigation
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault()
          const nav = e.currentTarget.dataset.nav
  
          // Remove active class from all links
          document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"))
          // Add active class to clicked link
          e.currentTarget.classList.add("active")
  
          // Show/hide sections based on navigation
          manualSection.style.display = nav === "ra manual" ? "block" : "none"
          hoursSection.style.display = nav === "hours" ? "block" : "none"
  
          // Redirect to cleaning checks page when "CheckMate" is clicked
          if (nav === "checkmate") {
            window.location.href = "cleaningchecks.html"
          }
        })
      })
    }
  
    function renderStats(stats) {
      statsGrid.innerHTML = stats
        .map(
          (stat) => `
              <div class="stat-card animate-float">
                  <div class="stat-value">${stat.value}</div>
                  <div class="stat-label">${stat.label}</div>
              </div>
          `,
        )
        .join("")
    }
  
    function renderFeatures(features) {
      featuresGrid.innerHTML = features
        .map(
          (feature) => `
            <div class="feature-card" onclick="window.location.href='${feature.url}'">
              <div class="feature-icon">${feature.icon}</div>
              <h3 class="feature-title">${feature.title}</h3>
              <p class="feature-description">${feature.description}</p>
            </div>
          `,
        )
        .join("")
    }
  
    function showDashboard(userType, email) {
      // Hide auth view and show dashboard
      authView.style.display = "none"
      dashboardView.style.display = "grid"
  
      // Set user info
      const name = email.split("@")[0]
      userAvatar.textContent = name[0].toUpperCase()
      userName.textContent = name
      userRole.textContent = userType === "ra" ? "Resident Assistant" : "Manager"
  
      // Render navigation and features based on user type
      if (userType === "ra") {
        renderNavItems(raNavItems)
        renderStats(raStats)
        renderFeatures(raFeatures)
        manualSection.style.display = "block"
        hoursSection.style.display = "block"
      } else {
        renderNavItems(managerNavItems)
        renderStats(managerStats)
        renderFeatures(managerFeatures)
        manualSection.style.display = "none"
        hoursSection.style.display = "none"
      }
  
      // Start updating current time
      updateCurrentTime()
      setInterval(updateCurrentTime, 60000)
    }
  
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault()
      const email = document.getElementById("email").value
      const userType = document.getElementById("user-type").value
  
      if (!userType) {
        alert("Please select a role")
        return
      }
  
      showLoader()
      await new Promise((resolve) => setTimeout(resolve, 1500))
      hideLoader()
      showDashboard(userType, email)
    })
  
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault()
      showLoader()
      await new Promise((resolve) => setTimeout(resolve, 1500))
      hideLoader()
      registerContainer.classList.remove("visible")
      loginContainer.style.display = "block"
      alert("Registration successful! Please login.")
    })
  
    // Handle back button
    window.addEventListener("popstate", () => {
      if (dashboardView.style.display !== "none") {
        dashboardView.style.display = "none"
        authView.style.display = "flex"
      }
    })
  
    // Dark mode toggle
    function toggleDarkMode() {
      document.body.classList.toggle("dark")
      localStorage.setItem("darkMode", document.body.classList.contains("dark"))
      updateDarkModeToggles()
    }
  
    function updateDarkModeToggles() {
      const isDarkMode = document.body.classList.contains("dark")
      darkModeToggleAuth.checked = isDarkMode
      darkModeToggleDashboard.checked = isDarkMode
    }
  
    darkModeToggleAuth.addEventListener("change", toggleDarkMode)
    darkModeToggleDashboard.addEventListener("change", toggleDarkMode)
  
    // Check for saved dark mode preference
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark")
      updateDarkModeToggles()
    }
  
    // Logout functionality
    logoutButton.addEventListener("click", () => {
      dashboardView.style.display = "none"
      authView.style.display = "flex"
      // Clear any user-related data or tokens here
    })
  
    // Cleaning Checks functionality
    const roomStatusTable = document.querySelector(".room-status-table")
    const roomDetails = document.getElementById("room-details")
    const residentMessage = document.getElementById("resident-message")
    const sendMessageButton = document.getElementById("send-message")
    const backToDashboardButton = document.getElementById("back-to-dashboard")
  
    if (roomStatusTable) {
      roomStatusTable.addEventListener("click", (e) => {
        const row = e.target.closest("tr")
        if (row && row.cells) {
          const apartment = row.cells[0].textContent
          showRoomDetails(apartment)
        }
      })
    }
  
    if (sendMessageButton) {
      sendMessageButton.addEventListener("click", () => {
        const message = residentMessage.value.trim()
        if (message) {
          alert(`Message sent to residents: ${message}`)
          residentMessage.value = ""
        } else {
          alert("Please enter a message before sending.")
        }
      })
    }
  
    if (backToDashboardButton) {
      backToDashboardButton.addEventListener("click", () => {
        window.location.href = "index.html"
      })
    }
  
    function showRoomDetails(apartment) {
      const mockDetails = {
        409: {
          kitchen: {
            tasks: [
              "Counter & walls wiped down",
              "Sink cleaned",
              "Faucet cleaned",
              "Fridge/freezer cleaned (inside/out/top)",
              "Microwave cleaned (inside/out)",
              "Cabinets wiped down (outside)",
              "Trash emptied (less than 1/3 full)",
              "Floor swept/mopped",
              "Dishes put away",
            ],
          },
          livingRoomBalcony: {
            tasks: [
              "Barstools clean/wiped down",
              "Window/sill cleaned (inside & out)",
              "Living room swept/mopped",
              "Walls cleaned",
              "Free from personal items",
              "Balcony clean/tidy/trash-free",
            ],
          },
          roomASinkHallway: {
            tasks: ["Sink cleaned", "Counter wiped down", "Mirror cleaned", "Hallway swept/mopped"],
          },
          roomABathroom: {
            tasks: ["Toilet cleaned (inside/outside)", "Shower/tub cleaned", "Floor swept/mopped", "Trash emptied"],
          },
          otherSinkHallway: {
            tasks: ["Sink cleaned", "Counter wiped down", "Mirror cleaned", "Hallway swept/mopped"],
          },
          otherBathroom: {
            tasks: ["Toilet cleaned (inside/outside)", "Shower/tub cleaned", "Floor swept/mopped", "Trash emptied"],
          },
          bedroomA: {
            tasks: ["Floor vacuumed/mopped", "Surfaces dusted", "Trash emptied", "Bed made"],
          },
          bedroomB: {
            tasks: ["Floor vacuumed/mopped", "Surfaces dusted", "Trash emptied", "Bed made"],
          },
          bedroomC: {
            tasks: ["Floor vacuumed/mopped", "Surfaces dusted", "Trash emptied", "Bed made"],
          },
          bedroomD: {
            tasks: ["Floor vacuumed/mopped", "Surfaces dusted", "Trash emptied", "Bed made"],
          },
        },
        // ... (other apartments with similar structure) ...
      }
  
      const details = mockDetails[apartment]
      if (details) {
        let html = `<h3>Room ${apartment} Details</h3>`
        for (const [area, info] of Object.entries(details)) {
          html += `
            <div class="room-section">
              <h4>${area.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</h4>
              <ul>
                ${info.tasks.map((task) => `<li>${task}</li>`).join("")}
              </ul>
            </div>
          `
        }
        roomDetails.innerHTML = html
        roomDetails.classList.add("active")
      } else {
        roomDetails.innerHTML = `<p>No details available for Room ${apartment}</p>`
        roomDetails.classList.add("active")
      }
    }
  })
  
  