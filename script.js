const routeSets = {
  food: [
    { name: "센텀–마린시티–광안리", detail: "바다 풍경과 가상 로컬 맛집을 잇는 탐방", meta: "센텀 → 파도식탁 → 광안리", icon: "🍽" },
    { name: "송도 바다식탁 산책", detail: "해안 산책 뒤 동네 식당을 발견하는 길", meta: "송도 → 바다정류장 → 암남공원", icon: "🥢" }
  ],
  view: [
    { name: "마린시티 노을 뷰 루트", detail: "도시와 수영만의 빛을 만나는 해안길", meta: "센텀 → 마린시티 → 광안리", icon: "🌊" },
    { name: "영도 절벽 바다길", detail: "파도와 절벽의 풍경을 따라 걷는 길", meta: "영도 → 흰여울 → 바다전망", icon: "☀" }
  ],
  quiet: [
    { name: "그린레일웨이 + 동백섬 루프", detail: "숲길과 해안길을 함께 걷는 고요한 루프", meta: "그린레일웨이 → 동백섬 → 해운대", icon: "🌿" },
    { name: "북항 물결 산책로", detail: "재생된 항만의 여유로운 풍경", meta: "북항 → 친수공원 → 바다쉼터", icon: "⚓" }
  ],
  photo: [
    { name: "광안대교 빛 포인트 루트", detail: "바다와 도시의 빛을 담는 사진 산책", meta: "민락수변 → 광안리 → 뷰포인트", icon: "📷" },
    { name: "영도 골목과 바다 프레임", detail: "골목 끝에서 만나는 바다 사진 명소", meta: "영도 → 골목전망 → 흰여울", icon: "🖼" }
  ]
};
const tasteNames = { food: "맛집 탐방형", view: "바다 뷰형", quiet: "조용한 산책형", photo: "사진 명소형" };
const tasteDescriptions = { food: "바다를 따라 걷고, 동네의 새로운 맛을 발견하는 여행을 좋아해요.", view: "탁 트인 바다와 도시의 빛이 만드는 풍경을 가장 좋아해요.", quiet: "사람이 비교적 적은 길에서 천천히 바다를 만나는 여행을 좋아해요.", photo: "특별한 풍경을 사진으로 남기며 여행의 순간을 기록하는 것을 좋아해요." };
const questions = [
  ["부산에서 가장 기대하는 순간은?", ["바다 근처의 맛있는 한 끼", "탁 트인 바다 풍경"]],
  ["걷다가 쉬고 싶을 때는?", ["조용한 벤치에서 쉬고 싶어요", "예쁜 사진을 남기고 싶어요"]],
  ["오늘의 여행 속도는 어떤가요?", ["골목도 천천히 둘러볼래요", "핵심 장소를 활기차게 갈래요"]],
  ["마음이 끌리는 탐방 지점은?", ["동네 카페나 식당", "해안 뷰포인트"]],
  ["가장 좋아하는 바다 시간대는?", ["한적한 오전", "빛이 예쁜 노을 무렵"]],
  ["친구에게 추천할 여행은?", ["맛있는 가게를 발견하는 여행", "사진으로 남기는 여행"]],
  ["길을 고를 때 중요한 것은?", ["사람이 비교적 적은 길", "바다를 가까이 보는 길"]],
  ["잠깐 들를 장소를 고른다면?", ["로컬 메뉴가 있는 식당", "전망 좋은 쉼터"]],
  ["오늘 남기고 싶은 것은?", ["나만 아는 동네 발견", "근사한 여행 사진"]],
  ["마지막 질문! 오늘의 기분은?", ["느긋하고 편안하게", "새롭고 특별하게"]]
];
const routeList = document.getElementById("routeList"), modal = document.getElementById("modalBackdrop"), quiz = document.getElementById("quizBackdrop");
let activeTaste = "food", currentStep = 0, quizIndex = 0, aiRouteIndex = 0, activeRoute = null, scores = { food: 0, view: 0, quiet: 0, photo: 0 };
const routeStops = {
  "센텀–마린시티–광안리": ["센텀시티", "마린시티 바다전망", "파도식탁 · 가상 로컬 식당", "광안리 해변"],
  "송도 바다식탁 산책": ["송도해수욕장", "송도 구름산책로", "바다정류장 · 가상 로컬 식당", "암남공원"],
  "마린시티 노을 뷰 루트": ["센텀시티", "마린시티 노을전망", "수영만 뷰포인트", "광안대교 야경"],
  "영도 절벽 바다길": ["영도대교", "흰여울 문화마을", "절벽전망 쉼터", "영도 바다전망"],
  "그린레일웨이 + 동백섬 루프": ["그린레일웨이", "동백섬 숲길", "바다쉼표 · 가상 카페", "해운대 해변"],
  "북항 물결 산책로": ["북항 친수공원", "항만 산책길", "물결식당 · 가상 로컬 식당", "바다쉼터"],
  "광안대교 빛 포인트 루트": ["민락수변공원", "광안대교 뷰포인트", "빛사진관 · 가상 카페", "광안리 해변"],
  "영도 골목과 바다 프레임": ["영도 골목입구", "골목전망 포인트", "프레임카페 · 가상 카페", "흰여울 바다" ]
};
const mapDestinations = {
  "센텀–마린시티–광안리": ["마린시티 부산", "광안리해수욕장 부산", "광안리해수욕장 부산"],
  "송도 바다식탁 산책": ["송도해수욕장 부산", "송도해수욕장 부산", "암남공원 부산"],
  "마린시티 노을 뷰 루트": ["마린시티 부산", "수영만 요트경기장 부산", "광안대교 부산"],
  "영도 절벽 바다길": ["흰여울문화마을 부산", "흰여울문화마을 부산", "영도 부산"],
  "그린레일웨이 + 동백섬 루프": ["동백섬 부산", "동백섬 부산", "해운대해수욕장 부산"],
  "북항 물결 산책로": ["부산항 북항친수공원", "부산항 북항친수공원", "부산항 북항친수공원"],
  "광안대교 빛 포인트 루트": ["광안대교 부산", "광안리해수욕장 부산", "광안리해수욕장 부산"],
  "영도 골목과 바다 프레임": ["흰여울문화마을 부산", "흰여울문화마을 부산", "흰여울문화마을 부산"]
};

function dailyRoutes(taste) { const day = Math.floor(Date.now() / 86400000); const all = routeSets[taste]; return [all[day % all.length], all[(day + 1) % all.length]]; }
function renderRoutes() { const baseRoutes = dailyRoutes(activeTaste); const todayRoutes = [baseRoutes[aiRouteIndex % baseRoutes.length], ...baseRoutes.filter((_, index) => index !== aiRouteIndex % baseRoutes.length)]; routeList.innerHTML = todayRoutes.map((route, index) => `<button class="route-card" aria-label="${route.name} 길 안내 보기"><span class="route-art">${route.icon}</span><span class="route-info"><span class="route-top"><b>${route.name}</b><span class="route-crowd">${index === 0 ? "AI 예시 추천" : tasteNames[activeTaste]}</span></span><p>${route.detail}</p><span class="route-meta"><span>⌁ ${route.meta}</span></span></span><span class="arrow">→</span></button>`).join(""); document.querySelectorAll(".route-card").forEach((card, index) => card.addEventListener("click", () => openNavigation(todayRoutes[index]))); document.getElementById("routeHeading").textContent = `${tasteNames[activeTaste]} 오늘의 추천`; }
function updateNavigation() { const stops = routeStops[activeRoute.name]; const step = stops[currentStep + 1]; document.getElementById("modalTitle").textContent = activeRoute.name; document.getElementById("navPlace").textContent = step; document.getElementById("navDescription").innerHTML = `${currentStep === 1 ? "가상의 로컬 탐방 지점도 함께 둘러보세요." : "해안길을 따라 다음 탐방 지점으로 이동하세요."} <span class="demo-label inline">예시 안내</span>`; document.getElementById("gpsNote").textContent = "위치 권한을 허용하면 현재 위치를 출발지로 사용합니다. 위치는 저장하지 않습니다."; document.querySelectorAll(".map-stop").forEach((stop, index) => { stop.classList.toggle("current", index === currentStep + 1); stop.querySelector("small").textContent = stops[index]; }); document.getElementById("completeRoute").textContent = currentStep === stops.length - 2 ? "루트 완주하기" : "다음 지점으로 안내받기"; }
function openGoogleMaps(origin = "") { const destination = mapDestinations[activeRoute.name][currentStep]; const params = new URLSearchParams({ api: "1", destination, travelmode: "walking" }); if (origin) params.set("origin", origin); window.open(`https://www.google.com/maps/dir/?${params.toString()}`, "_blank", "noopener"); }
function requestGpsNavigation() { const note = document.getElementById("gpsNote"); if (!navigator.geolocation) { note.textContent = "이 기기에서는 GPS를 사용할 수 없어, 목적지만 표시한 Google 지도를 엽니다."; openGoogleMaps(); return; } note.textContent = "현재 위치를 확인하는 중이에요…"; navigator.geolocation.getCurrentPosition(position => { const { latitude, longitude } = position.coords; note.textContent = "현재 위치를 출발지로 설정했어요. Google 지도가 새 창에서 열립니다."; openGoogleMaps(`${latitude},${longitude}`); }, () => { note.textContent = "위치 권한이 허용되지 않아, 목적지만 표시한 Google 지도를 엽니다."; openGoogleMaps(); }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }); }
function openNavigation(route = dailyRoutes(activeTaste)[0]) { activeRoute = route; currentStep = 0; modal.hidden = false; document.body.style.overflow = "hidden"; updateNavigation(); }
function closeModal() { modal.hidden = true; document.body.style.overflow = ""; }
function showNotice(message) { const notice = document.createElement("div"); notice.className = "notice"; notice.textContent = message; document.body.append(notice); setTimeout(() => notice.remove(), 2400); }
function goHome() { window.scrollTo({ top: 0, behavior: "smooth" }); }
function showQuiz() { quiz.hidden = false; document.getElementById("quizIntro").hidden = false; document.getElementById("quizQuestions").hidden = true; document.getElementById("quizResult").hidden = true; }
function beginQuiz() { quizIndex = 0; scores = { food: 0, view: 0, quiet: 0, photo: 0 }; document.getElementById("quizIntro").hidden = true; document.getElementById("quizQuestions").hidden = false; document.getElementById("quizResult").hidden = true; renderQuestion(); }
function renderQuestion() { const [title, answers] = questions[quizIndex]; document.getElementById("quizProgress").textContent = `${quizIndex + 1} / ${questions.length}`; document.getElementById("quizQuestion").textContent = title; document.getElementById("quizOptions").innerHTML = answers.map((answer, index) => `<button data-answer="${index}">${answer}</button>`).join(""); document.querySelectorAll("#quizOptions button").forEach(button => button.addEventListener("click", () => chooseAnswer(Number(button.dataset.answer)))); }
function chooseAnswer(answer) { const pairs = [["food", "view"], ["quiet", "photo"], ["quiet", "view"], ["food", "view"], ["quiet", "photo"], ["food", "photo"], ["quiet", "view"], ["food", "view"], ["food", "photo"], ["quiet", "photo"]]; scores[pairs[quizIndex][answer]] += 1; quizIndex += 1; if (quizIndex < questions.length) renderQuestion(); else { activeTaste = Object.keys(scores).reduce((best, key) => scores[key] > scores[best] ? key : best, "food"); document.querySelectorAll(".taste-tab").forEach(tab => tab.classList.toggle("active", tab.dataset.taste === activeTaste)); renderRoutes(); document.getElementById("quizQuestions").hidden = true; document.getElementById("resultTaste").textContent = tasteNames[activeTaste]; document.getElementById("resultDescription").textContent = tasteDescriptions[activeTaste]; document.getElementById("quizResult").hidden = false; } }

document.getElementById("startButton").addEventListener("click", showQuiz); document.getElementById("beginQuiz").addEventListener("click", beginQuiz); document.getElementById("restartQuiz").addEventListener("click", beginQuiz); document.getElementById("viewResultRoutes").addEventListener("click", () => { quiz.hidden = true; document.getElementById("routes").scrollIntoView({ behavior: "smooth" }); }); ["skipQuiz", "stopQuiz"].forEach(id => document.getElementById(id).addEventListener("click", () => { quiz.hidden = true; document.getElementById("routes").scrollIntoView({ behavior: "smooth" }); })); document.getElementById("homeButton").addEventListener("click", goHome); document.getElementById("navHome").addEventListener("click", goHome); document.getElementById("navRoute").addEventListener("click", () => document.getElementById("routes").scrollIntoView({ behavior: "smooth" })); document.getElementById("aiRecommendButton").addEventListener("click", () => { const button = document.getElementById("aiRecommendButton"); button.disabled = true; button.querySelector("b").textContent = "AI가 새 루트를 고르는 중…"; setTimeout(() => { aiRouteIndex += 1; renderRoutes(); button.disabled = false; button.querySelector("b").textContent = "AI에게 새 루트 추천받기"; showNotice(`새 ${tasteNames[activeTaste]} 예시 루트를 추천했어요!`); }, 550); }); document.getElementById("routeMakerButton").addEventListener("click", () => openNavigation()); document.getElementById("openGoogleMaps").addEventListener("click", requestGpsNavigation); document.getElementById("closeModal").addEventListener("click", closeModal); modal.addEventListener("click", event => { if (event.target === modal) closeModal(); }); document.getElementById("completeRoute").addEventListener("click", () => { const stopCount = routeStops[activeRoute.name].length; if (currentStep < stopCount - 2) { currentStep += 1; updateNavigation(); } else { showNotice(`${activeRoute.name} 루트를 완주했어요!`); closeModal(); } }); document.querySelectorAll(".map-stop").forEach((stop, index) => stop.addEventListener("click", () => { if (activeRoute && index > 0 && index < routeStops[activeRoute.name].length) { currentStep = index - 1; updateNavigation(); } })); document.querySelectorAll(".taste-tab").forEach(tab => tab.addEventListener("click", () => { activeTaste = tab.dataset.taste; aiRouteIndex = 0; document.querySelectorAll(".taste-tab").forEach(item => item.classList.toggle("active", item === tab)); renderRoutes(); })); document.getElementById("storyButton").addEventListener("click", () => showNotice("AR 도슨트는 다음 단계에서 연결할 기능이에요.")); renderRoutes();
