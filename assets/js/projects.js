/* projects.js — edit this file to update your portfolio entries */
window.PROJECTS = [
  {
    id: 'acc',
    number: '01',
    pinned: true,
    title: 'ACC',
    titleEm: 'adaptive cruise',
    tag: 'automotive',
    year: '2026',
    role: 'System lead · Architecture',
    stack: 'AUTOSAR Classic · MATLAB/Simulink · CAN · StrictDoc',
    cover: 'assets/img/acc/cover.jpg',
    summary:
      '5인 팀으로 만든 차량용 ACC(Adaptive Cruise Control) 시스템. 요구공학(StrictDoc) → AUTOSAR Classic MBD → 임베디드 보드 → HMI/센서퓨전까지 한 번에 엮은 학습 프로젝트. SeSAC 팀별 프로젝트 1등 우수상.',
    body: [
      '3개 컴퓨팅 노드(Raspberry Pi 5 / NXP MPC5606B / Arduino Uno ×2)가 CAN @ 500 kbit/s로 연결된 풀스택 자동차 시스템입니다. Automotive SPICE 4.0 + ISO 26262:2018 의 일부를 tailoring 해서 적용했고, ASIL-B 항목까지 safe-state 동작을 검증했습니다.',
      '제가 시스템/PM 역할로 요구사항(SYS/SWR/SAF/HWR ~110개), HARA, 아키텍처, AUTOSAR Composition(5 SWC), CAN DBC, 일정 관리를 담당했습니다. 가장 기억에 남는 작업은 AUTOSAR Composition 구조 — 5개 SWC 와 8개 bus-binding / 7개 intra-ECU assembly connector 를 어떻게 잘라야 제어 주기(10/20/50ms)와 안전 책임(Diagnostics 분리)이 깔끔하게 떨어지는지를, 모델을 몇 번이나 갈아엎으면서 잡았던 부분.',
      '배운 것 한 줄: "타임아웃 → safe-state" 같은 단순한 규칙이 ASIL-B 의 9할이고, 화려한 진단보다 확실한 fallback 이 우선이라는 것.',
    ],
    gallery: [
      { src: 'assets/img/acc/01-architecture.jpg', wide: true },
      { src: 'assets/img/acc/02-vehicle.jpg' },
      { src: 'assets/img/acc/03-award.jpg' },
      { src: 'assets/img/acc/04-demo.jpg' },
      { src: 'assets/img/acc/05-team.jpg' },
    ],
    links: [
      { label: 'GitHub →', url: 'https://github.com/gaepo-japcho/ACC' },
    ],
  },
  {
    id: 'cosmos',
    number: '02',
    pinned: true,
    title: 'Cosmos',
    titleEm: 'bare-metal',
    tag: 'systems',
    year: '2024 — now',
    role: 'Solo project',
    stack: 'Rust · AArch64 · QEMU',
    cover: 'https://picsum.photos/seed/cosmos-cover/1600/900',
    summary:
      'AArch64 위에서 동작하는 작은 운영체제를 Rust 로 처음부터 짜고 있는 long-running 프로젝트. QEMU virt 머신을 타깃으로 부트, 페이지 테이블, 디바이스 트리, 디스크 이미지까지 직접 다룬다.',
    body: [
      'Rust 로 운영체제를 짜보고 싶다는 생각으로 시작했습니다. nightly toolchain 위에서 no_std 환경의 커널을 굽고, QEMU 의 device tree 를 파싱해 메모리 / UART / 디스크를 잡아갑니다.',
      'aarch64-paging, hermit-os, theseus-os 같은 Rust 생태계의 OS 프로젝트들을 레퍼런스로 삼아, "교과서 OS" 가 아니라 Rust 의 타입 시스템이 커널 설계에 어디까지 도움이 되는지를 직접 만져보는 게 목적.',
    ],
    gallery: [
      { src: 'https://picsum.photos/seed/cosmos-1/1600/900', wide: true },
      { src: 'https://picsum.photos/seed/cosmos-2/1200/900' },
    ],
    links: [
      { label: 'GitHub →', url: 'https://github.com/parkjbdev/cosmos' },
    ],
  },
  {
    id: 'pintos',
    number: '03',
    pinned: true,
    title: 'PintOS',
    titleEm: 'KAIST',
    tag: 'systems',
    year: '2023',
    role: 'Coursework',
    stack: 'C · x86_64 · QEMU',
    cover: 'https://picsum.photos/seed/pintos-cover/1600/900',
    summary:
      'KAIST CS330 의 x86_64 PintOS 과제. 스레드 스케줄러, 사용자 프로세스, 가상 메모리, 파일 시스템 4개 프로젝트를 처음부터 끝까지 직접 채우는 교육용 OS.',
    body: [
      'PintOS 의 골격만 주어진 상태에서 priority scheduler, syscall 인터페이스, demand paging / mmap, 파일시스템 캐시·subdirectory 까지 단계별로 구현했습니다.',
      'Cosmos 가 "백지에서 OS 를 디자인" 하는 쪽이라면, PintOS 는 "고전적인 OS 의 구조를 한 번 통과" 하는 쪽 — 두 프로젝트가 머릿속에서 OS 의 모양을 잡는 데 보완적으로 작동했습니다.',
    ],
    gallery: [
      { src: 'https://picsum.photos/seed/pintos-1/1600/900', wide: true },
      { src: 'https://picsum.photos/seed/pintos-2/1200/900' },
    ],
    links: [
      { label: 'GitHub →', url: 'https://github.com/parkjbdev/pintos-kaist' },
    ],
  },
  {
    id: 'coffee-flavor-wheel',
    number: '04',
    title: 'Coffee Flavor Wheel',
    titleEm: 'interactive',
    tag: 'tooling',
    year: '2025 — 2026',
    role: 'Solo project',
    stack: 'React Native · TypeScript · SVG',
    cover: 'https://picsum.photos/seed/coffee-cover/1600/900',
    summary:
      'SCA 커피 플레이버 휠을 그대로 인터랙티브하게 만진 모바일 앱. 안쪽 카테고리부터 바깥쪽 디테일까지 SVG 로 직접 그려서 줌·탭으로 탐색할 수 있다.',
    body: [
      '종이로 인쇄된 SCA flavor wheel 을 손가락으로 따라가던 경험을 그대로 살리고 싶었던 작은 프로젝트. SVG 좌표를 React Native 위에 직접 올리고, 슬라이스 단위로 hit-test 를 처리해 어떤 노트든 한 번의 탭으로 분리할 수 있게 만들었습니다.',
      '커피 노트의 위계(Floral → Tea-like → Black Tea …)를 데이터로 분리해서, UI 는 동일하게 유지한 채 다른 휠로 갈아끼울 수 있도록 설계.',
    ],
    gallery: [
      { src: 'https://picsum.photos/seed/coffee-1/1200/900' },
      { src: 'https://picsum.photos/seed/coffee-2/1200/900' },
    ],
    links: [
      { label: 'GitHub →', url: 'https://github.com/parkjbdev/coffee-flavor-wheel' },
    ],
  },
  {
    id: 'autopia',
    number: '05',
    pinned: true,
    title: 'AUTOPIA',
    titleEm: 'autonomous',
    tag: 'autonomous driving',
    year: '2022',
    role: 'Founder · Team lead',
    stack: 'ROS · Jetson Nano · OpenCV · SLAM · MORAI',
    cover: 'assets/img/autopia/logo.png',
    coverFit: 'contain',
    summary:
      '아주대 교내 최초의 자율주행 소학회를 창단해 초대 회장으로 이끌고, 한 해 동안 1/10 스케일 자율주행 차량으로 3개 대회에서 연속 수상한 long-running 프로젝트.',
    body: [
      '2022년 한 해 동안 같은 차량 플랫폼(Jetson Nano + Arduino + 카메라/IMU)을 계속 키워가며 세 개의 자율주행 대회에 출전했습니다 — MORAI 가상환경 대회 대상(2월), 제주 국제대학생 자율주행 대회 금상(6월, 팀장), HL만도/HL Klemove 자율주행모빌리티 대회 최우수상(12월).',
      '레인 인식은 NVIDIA AI 모델을 시도했다가 카메라 각도와 연산자원 한계로 OpenCV 기반 차선 인식 + Hough 변환 으로 회귀, 주행 제어는 Pure Pursuit + PID, 그리고 SLAM 위치 추정 보정과 신호등 인식까지 단계적으로 얹었습니다. ROS 위에서 센서 → 인식 → 제어 파이프라인 전체 아키텍처를 잡았던 게 가장 기억에 남는 작업.',
      '대회 성과를 일회성으로 끝내지 않으려고 교내 최초의 자율주행 동아리 AUTOPIA 를 창단해 초대 회장직을 맡고, 학교에 NVIDIA GPU 기반 연산 실습실 신설을 제안해 확보, 1/10 스케일 차량을 위한 주행 트랙까지 직접 깔았습니다.',
    ],
    gallery: [
      { src: 'assets/img/autopia/01-morai-sim.png', wide: true },
      { src: 'assets/img/autopia/02-award-morai.jpg' },
      { src: 'assets/img/autopia/03-award-jeju.jpg' },
      { src: 'assets/img/autopia/04-award-hl.jpg' },
      { src: 'assets/img/autopia/05-vehicle-build.jpg' },
      { src: 'assets/img/autopia/06-rviz-slam.jpg' },
      { src: 'assets/img/autopia/10-team.jpg' },
    ],
    links: [],
  },
  {
    id: 'cookie',
    number: '05',
    title: 'Cookie',
    titleEm: 'capstone',
    tag: 'mobile',
    year: '2023',
    role: 'Team project · 융합캡스톤디자인',
    stack: 'Flutter · Dart · MVVM',
    cover: 'https://picsum.photos/seed/cookie-cover/1600/900',
    summary:
      '아주대 융합캡스톤디자인 1·2 두 학기 동안 굴린 Flutter 앱. 아이디어 발표(3월) 부터 최종 발표(12월) 까지 격주 발표를 거치며 MVVM 구조 위에서 한 제품을 끝까지 다듬었다.',
    body: [
      '한 해 동안 같은 제품을 두고 발표 → 피드백 → 리팩터 → 다시 발표 의 사이클을 13번 돌리면서, "기획이 어떻게 코드로 굳어지는가" 를 처음으로 끝까지 본 프로젝트.',
      'Flutter + Dart 위에 MVVM 을 깔아 화면/상태/비즈니스 로직을 분리하고, 팀원들이 동시에 손대도 충돌이 적도록 모듈 경계를 잡았습니다. 발표 데모 시나리오가 항상 main 에서 돌아가도록 유지하는 데 신경을 많이 썼습니다.',
    ],
    gallery: [
      { src: 'https://picsum.photos/seed/cookie-1/1200/900' },
      { src: 'https://picsum.photos/seed/cookie-2/1200/900' },
    ],
    links: [
      { label: 'GitHub →', url: 'https://github.com/parkjbdev/cookie' },
    ],
  },
  {
    id: 'weplan',
    number: '06',
    title: 'WePlan',
    titleEm: 'SRS-driven',
    tag: 'mobile',
    year: '2023',
    role: 'Team lead',
    stack: 'Flutter · Dart · MVVM',
    cover: 'https://picsum.photos/seed/weplan-cover/1600/900',
    summary:
      '동아리방 사용 시간을 예약·공유하는 Flutter 앱. Project Proposal → SRS → Design Document → Final Report 까지 소프트웨어 공학 풀 사이클을 한 번 통과시키며 팀장으로 끌고 갔다.',
    body: [
      '사용자 요구사항을 IEEE 스타일 SRS 로 옮기고, 그걸 기준으로 Design Document 를 그리고, 그 위에서 Flutter 앱을 MVVM 으로 구현하는 정석적인 V 모델 프로젝트였습니다.',
      '문서가 코드를 끌고 가는 워크플로를 팀장으로 직접 굴려보면서, 나중에 ACC 에서 StrictDoc / 요구사항 추적성을 자연스럽게 받아들일 수 있는 토대가 됐습니다.',
    ],
    gallery: [
      { src: 'https://picsum.photos/seed/weplan-1/1200/900' },
      { src: 'https://picsum.photos/seed/weplan-2/1200/900' },
    ],
    links: [
      { label: 'GitHub →', url: 'https://github.com/parkjbdev/WePlan' },
    ],
  },
  {
    id: 'smart-ir',
    number: '07',
    title: 'Smart IR Hub',
    titleEm: 'home',
    tag: 'embedded',
    year: '2024',
    role: 'Team project',
    stack: 'ESP32 · Arduino C++ · Node-RED',
    cover: 'https://picsum.photos/seed/smartir-cover/1600/900',
    summary:
      'ESP32 WROOM 기반 IR 학습/송출 허브. 기존 가전 리모컨의 IR 패턴을 학습해서 Node-RED 플로우로 묶어 한 화면에서 제어할 수 있게 만든 IoT 프로젝트.',
    body: [
      'IR 코드 학습/저장/재송출, 부저 피드백, 키패드 매트릭스 입력을 ESP32 한 칩에 모으고, 위쪽에는 Node-RED 플로우를 얹어 웹 대시보드와 자동화 트리거를 붙였습니다.',
      '저렴한 부품 몇 개로 이미 거실에 깔린 비-스마트 가전을 통째로 묶어버리는 게 재밌었던 프로젝트. 상위 자동화는 Node-RED 가 다 가져가니, MCU 쪽 코드는 단순하고 결정적인 상태로 유지했습니다.',
    ],
    gallery: [
      { src: 'https://picsum.photos/seed/smartir-1/1200/900' },
      { src: 'https://picsum.photos/seed/smartir-2/1200/900' },
    ],
    links: [
      { label: 'GitHub →', url: 'https://github.com/parkjbdev/smart_ir' },
    ],
  },
  {
    id: 'elevator',
    number: '08',
    title: 'Elevator FSM',
    titleEm: 'Verilog',
    tag: 'hardware',
    year: '2023',
    role: 'Coursework (ECE358)',
    stack: 'Verilog · FPGA · FSM',
    cover: 'https://picsum.photos/seed/elev-cover/1600/900',
    summary:
      '최대 2인 사용자 입력을 받아 방문할 층을 스케줄링하고 캐빈 이동을 제어하는 엘리베이터 컨트롤러를 Verilog 로 처음부터 모듈 단위로 설계한 디지털 회로 과제.',
    body: [
      '입력 디코더 / 스케줄러 / 모터 컨트롤러 / 디스플레이 같은 서브 모듈을 각각 FSM 으로 분리해 설계하고, top-level 에서 합쳤습니다. 동시에 두 사용자가 누른 호출을 같은 방향이면 묶고 다른 방향이면 우선순위로 처리하는 스케줄링이 가장 어려웠던 부분.',
      '소프트웨어로 같은 문제를 풀었다면 얼마든지 immediate 하게 바꿀 수 있는 결정들을, 클럭 도메인과 레지스터 단위로 강제로 직렬화시키는 경험이 좋았습니다.',
    ],
    gallery: [
      { src: 'https://picsum.photos/seed/elev-1/1200/900' },
      { src: 'https://picsum.photos/seed/elev-2/1200/900' },
    ],
    links: [
      { label: 'GitHub →', url: 'https://github.com/parkjbdev/ECE358_Elevator' },
    ],
  },
];
