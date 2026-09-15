document.addEventListener("DOMContentLoaded", () => {
  // 1. Chức năng Menu di động (Mobile Menu Toggle)
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen);
      // Thay đổi icon burger sang dấu X khi mở
      menuToggle.innerHTML = isOpen ? "✕" : "☰";
    });

    // Đóng menu khi nhấp vào một link bất kỳ
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = "☰";
      });
    });
  }

  // 2. Hiệu ứng hiển thị khi cuộn trang (Scroll Reveal)
  const reveals = document.querySelectorAll(".reveal");
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Ngừng theo dõi khi đã hiện
      }
    });
  }, revealOptions);

  reveals.forEach((reveal) => revealObserver.observe(reveal));

  // 3. Bộ lọc thẻ sản phẩm (Product Filter)
  const filterBtns = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Xóa active class ở tất cả button, sau đó thêm vào button được click
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      // Lọc sản phẩm dựa trên data-category
      productCards.forEach((card) => {
        if (
          filterValue === "all" ||
          card.getAttribute("data-category") === filterValue
        ) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  });

  // 4. Trắc nghiệm gợi ý sản phẩm (Mini Quiz)
  const quizOptions = document.querySelectorAll("#quizOptions button");
  const resultTitle = document.getElementById("resultTitle");
  const resultText = document.getElementById("resultText");
  const resultLink = document.getElementById("resultLink");

  // Dữ liệu trả về tương ứng với các nút trắc nghiệm
  const quizData = {
    fresh: {
      title: "Dòng Fresh & Free",
      text: "Lựa chọn tuyệt vời cho ngày thường, mang lại cảm giác mỏng nhẹ, thông thoáng và dễ chịu.",
      link: "https://www.kao.com/vn/products/laurier/",
    },
    cool: {
      title: "Dòng Super Slimguard Cool",
      text: "Công nghệ Cool Menthol đem lại sự mát lạnh, kiểm soát mùi hoàn hảo cho ngày nóng bức.",
      link: "https://www.kao.com/vn/products/laurier/lre_super_slim_guard_cool_25_01/",
    },
    soft: {
      title: "Dòng Kháng Khuẩn Siêu Mềm",
      text: "Đặc biệt nhẹ dịu cho da, trang bị tính năng kháng khuẩn giúp bạn hoàn toàn an tâm.",
      link: "https://www.kao.com/vn/products/laurier/",
    },
    night: {
      title: "Dòng Ban Đêm An Toàn",
      text: "Thiết kế độ dài lý tưởng, ôm sát cơ thể, chống tràn vượt trội để ngủ ngon đến sáng.",
      link: "https://www.kao.com/vn/products/laurier/",
    },
  };

  quizOptions.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Đổi trạng thái hiển thị của các nút trắc nghiệm
      quizOptions.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");

      const resultKey = btn.getAttribute("data-result");
      const data = quizData[resultKey];

      // Đổ dữ liệu mới vào phần kết quả
      if (data) {
        resultTitle.textContent = data.title;
        resultText.textContent = data.text;
        resultLink.href = data.link;

        // Kích hoạt thông báo pop-up
        showToast("Đã có gợi ý dòng sản phẩm cho bạn!");
      }
    });
  });

  // 5. Hiệu ứng thông báo ngắn (Toast Notification)
  const toast = document.getElementById("toast");
  let toastTimeout;

  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    // Xóa timeout cũ nếu click liên tục
    clearTimeout(toastTimeout);

    // Tự động ẩn sau 3 giây
    toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
});
