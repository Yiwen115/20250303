let slider;
let label;
let button;
let isJumping = false;
let offsets = [];
let dropdown;
let iframe;

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.position(10, 10);
  
  slider = createSlider(28, 50, 32); // 創建滑桿，範圍從28到50，初始值為32
  slider.position(input.x + input.width + 10, 10); // 將滑桿放置在文字框右側
  
  label = createDiv('文字大小'); // 創建標籤
  label.position(slider.x + slider.width + 10, 10); // 將標籤放置在滑桿右側
  label.style('color', 'white'); // 設置標籤文字顏色為白色
  
  button = createButton('跳動'); // 創建按鈕
  button.position(slider.x + slider.width + 100, 10); // 將按鈕放置在標籤右側一點點
  button.mousePressed(toggleJumping); // 設置按鈕按下時的回調函數

  dropdown = createSelect(); // 創建下拉式選單
  dropdown.position(button.x + button.width + 30, 10); // 將下拉式選單向右移動3格
  dropdown.option('TKU');
  dropdown.option('ET');
  dropdown.option('筆記');
  dropdown.changed(handleDropdownChange); // 設置選單變更時的回調函數

  iframe = createElement('iframe');
  iframe.position(100, 100);
  iframe.size(windowWidth - 200, windowHeight - 200);
}

function toggleJumping() {
  isJumping = !isJumping;
  if (isJumping) {
    button.html('停止跳動');
    offsets = Array.from({ length: Math.ceil(windowWidth / textWidth(' ')) * Math.ceil(windowHeight / 40) }, () => random(0, TWO_PI));
  } else {
    button.html('跳動');
  }
}

function handleDropdownChange() {
  let selected = dropdown.value();
  if (selected === 'TKU') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  } else if (selected === 'ET') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  } else if (selected === '筆記') {
    iframe.attribute('src', 'https://hackmd.io/@Yiwen115/H1XjmKfj1l');
  }
}

function draw() {
  background(0); // 背景顏色設置為黑色
  let textValue = input.value();
  let textSizeValue = slider.value(); // 根據滑桿的值設置文字大小
  fill(255); // 文字顏色設置為白色
  textAlign(LEFT, CENTER);
  textSize(textSizeValue);
  
  let y = 0; // 從上方開始顯示
  let index = 0;
  while (y < height) {
    let x = 0;
    while (x < width) {
      let offsetY = isJumping ? sin(offsets[index] + frameCount * 0.1) * 10 : 0;
      text(textValue, x, y + offsetY);
      x += textWidth(textValue) + textWidth(' '); // 加上空格的寬度
      index++;
    }
    y += textSizeValue + 8; // 每句話之間的間隔，根據文字大小調整
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  iframe.size(windowWidth - 200, windowHeight - 200);
}

