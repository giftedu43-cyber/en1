const routes = [
  { name: "센텀–마린시티–광안리", detail: "도시의 빛과 바다를 잇는 대표 해안길", meta: "센텀 → 마린시티 → 광안리", icon: "🌉", crowd: "혼잡 확인" },
  { name: "그린레일웨이 + 동백섬 루프 코스", detail: "숲길과 해안 산책로를 함께 걷는 루프", meta: "그린레일웨이 → 동백섬 → 해운대", icon: "🌿", crowd: "혼잡 확인" }
];

const routeList = document.getElementById("routeList");
const modal = document.getElementById("modalBackdrop");
const steps = [
  { place: "마린시티 바다전망", description: "해안 산책로를 따라 약 8분 이동하세요." },
  { place: "파도식탁 · 가상 로컬 식당", description: "바다 전망을 즐긴 뒤, 가상의 로컬 맛집 탐방 지점을 확인하세요." },
  { place: "광안리 해변", description: "해변 산책로 끝까지 이동하면 이번 루트가 완성돼요." }
];
let currentStep = 0;

function renderRoutes() {
  routeList.innerHTML = routes.map(route => `
    <button class="route-card" aria-label="${route.name} 길 안내 보기">
      <span class="route-art">${route.icon}</span>
      <span class="route-info"><span class="route-top"><b>${route.name}</b><span class="route-crowd">${route.crowd}</span></span><p>${route.detail}</p><span class="route-meta"><span>⌁ ${route.meta}</span></span></span>
      <span class="arrow">→</span>
    </button>`).join("");
  document.querySelectorAll(".route-card").forEach(card => card.addEventListener("click", openNavigation));
}

function updateNavigation() {
  const step = steps[currentStep];
  document.getElementById("navPlace").textContent = step.place;
  document.getElementById("navDescription").innerHTML = `${step.description} <span class="demo-label inline">예시 안내</span>`;
  document.querySelectorAll(".map-stop").forEach((stop, index) => stop.classList.toggle("current", index === currentStep + 1));
  document.getElementById("completeRoute").textContent = currentStep === steps.length - 1 ? "루트 완주하기" : "다음 지점으로 안내받기";
}

function openNavigation() { currentStep = 0; modal.hidden = false; document.body.style.overflow = "hidden"; updateNavigation(); }
function closeModal() { modal.hidden = true; document.body.style.overflow = ""; }
function showNotice(message) { const notice = document.createElement("div"); notice.className = "notice"; notice.textContent = message; document.body.append(notice); setTimeout(() => notice.remove(), 2400); }
function goHome() { window.scrollTo({ top: 0, behavior: "smooth" }); }

document.getElementById("startButton").addEventListener("click", () => document.getElementById("routes").scrollIntoView({ behavior: "smooth" }));
document.getElementById("homeButton").addEventListener("click", goHome);
document.getElementById("navHome").addEventListener("click", goHome);
document.getElementById("navRoute").addEventListener("click", () => document.getElementById("routes").scrollIntoView({ behavior: "smooth" }));
document.getElementById("routeMakerButton").addEventListener("click", openNavigation);
document.getElementById("closeModal").addEventListener("click", closeModal);
modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
document.getElementById("completeRoute").addEventListener("click", () => {
  if (currentStep < steps.length - 1) { currentStep += 1; updateNavigation(); }
  else { showNotice("센텀–마린시티–광안리 루트를 완주했어요!"); closeModal(); }
});
document.querySelectorAll(".map-stop").forEach((stop, index) => stop.addEventListener("click", () => { if (index > 0 && index <= steps.length) { currentStep = index - 1; updateNavigation(); } else showNotice("출발 지점입니다. 다음 지점으로 이동해 보세요."); }));
document.getElementById("storyButton").addEventListener("click", () => showNotice("AR 도슨트는 다음 단계에서 연결할 기능이에요."));
renderRoutes();
