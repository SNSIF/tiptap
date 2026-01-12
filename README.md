# Tiptap

## 프로젝트 소개 (Introduction)
- **프로젝트 이름**: Tiptap
- **설명**: Tiptap 라이브러리를 사용한 RTE(Rich Text Editor) 컴포넌트



## 서비스 개요 (Service Overview)
- **서비스 목적**: 최근 에디터 기능을 사용하는 프로젝트가 많이 추가되어, 추후 다른 프로젝트에서 RTE를 사용 시 재사용성을 높히기 위한 서비스입니다.



## 데모 & 스크린샷 (Demo & Screenshots)
<img width="1923" height="1081" alt="제목 없음" src="https://github.com/user-attachments/assets/a7e43c1c-f8e0-4fa3-8cd3-93b71e11a263" />

- 실제 사용자가 사용할 수 있는 화면입니다. 
- 보여지는 화면 외에도 볼드, 이탤릭 등 기본적인 기능과 이미지 삽입, 코드 삽입, 링크 삽입 등의 기능이 존재합니다.



## 설치 (Installation)
```bash
$ git clone https://github.com/SNSIF/tiptap
$ cd repo
```



## 실행 방법 (Usage)
```bash
$ npm install 
$ npm run dev
```



## 개발환경 & 기술 스택 (Development Env & Tech Stack)
- **필수 환경**
  - Node.js 18+

- **기술 스택**

<table>
  <tr>
    <th>구분</th>
    <th>내용</th>
  </tr>

  <tr>
    <td>Frontend</td>
    <td>
      <img src="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=white" /> 
      <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=white" alt="JAVASCRIPT" /> 
      <img src="https://img.shields.io/badge/TypeScript-3172C6.svg?&style=for-the-badge&logo=TypeScript&logoColor=white" /> 
      <img src="https://img.shields.io/badge/HTML5-E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white" alt="HTML5" /> 
      <img src="https://img.shields.io/badge/CSS3-1572B6.svg?&style=for-the-badge&logo=CSS3&logoColor=white" alt="CSS3" /> 
      <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4.svg?&style=for-the-badge&logo=TailwindCSS&logoColor=white" /> 
    </td>
  </tr>
</table>



## 프로젝트 구조 (Project Structure)
```bash
📁 frontend                     
 ├── 📁 public                    
 ├── 📁 src                     
 │    ├── 📁 assets             
 │    ├── 📁 component          
 │    ├── 📁 container/client       
 │    │   └── 📄 editor.tsx      // 에디터 페이지
 │    ├── 📁 hooks/editor
 │    │   ├── 📁 modal           // 색 및 하이라이트 시 모달 및 링크 모달
 │    │   ├── 📁 node            // 커스텀 익스텐션 내부 node 구조
 │    │   ├── 📄 extension.ts    // 커스텀 익스텐션(이미지 및 코드블럭)
 │    │   ├── 📄 font.ts         // 폰트 관련 설정
 │    │   ├── 📄 selectBox.tsx   // 폰트 및 폰트 사이즈를 위한 커스텀 selectbox
 │    │   ├── 📄 toolbar.tsx     // 상단 툴바 컴포넌트
 │    │   └── 📄 useEvent.ts     // 단축키 이벤트 
 │    ├── 📁 utils         
 │    ├── 📄 App.css        
 │    ├── 📄 App.tsx         
 │    ├── 📄 global.d.ts       
 │    └── 📄 index.css         
 ├── 📄 .gitignore           
 ├── 📄 index.html           
 ├── 📄 tailwind.config.js 
 ├── 📄 tsconfig.app.json   
 ├── 📄 tsconfig.json         
 ├── 📄 tsconfig.node.json   
 └── 📄 vite.config.ts      
```



## 주요 기능 (Features)
### 폰트 
- 폰트 변경: 상단바를 사용하여 폰트 변경이 가능합니다. 현재 포함되어 있는 폰트는 Inter, Apple, Roboto, Gmarket 4종입니다.
- 폰트 사이즈 변경: 상단바를 사용하여 폰트 사이즈 변경이 가능합니다. 워드 기준 포인트와 동일합니다.
- 폰트 색상 및 하이라이트: 상단바를 사용하여 폰트 색상 및 하이라이트가 가능합니다. UI는 노션에서 차용하였으며 `ctrl` + `shift` + `H`를 통해 최근 사용 항목을 적용할 수 있습니다. 

### 텍스트 관련
- 텍스트 변경(굵기, 이탤릭, 밑줄, 취소선): 상단바 및 단축키를 사용하여 텍스트 변경이 가능합니다.
  - 텍스트 굵기: `ctrl` + `B`
  - 텍스트 이탤릭: `ctrl` + `I`
  - 텍스트 밑줄: `ctrl` + `U`
  - 텍스트 취소선: `ctrl` + `shift` + `S` or `X`
- 텍스트 정렬: 상단바 및 단축키를 사용하여 텍스트 정렬이 가능합니다.
  - 좌측 정렬: `ctrl` + `shift` + `L`
  - 가운데 정렬: `ctrl` + `shift` + `E`
  - 우측 정렬: `ctrl` + `shift` + `R`
- 텍스트 이동: 텍스트는 드래그앤 드롭으로 위치를 옮길 수 있습니다. 또는 `alt` + `↑` or `↓`을 사용해서 상하 이동이 가능합니다. 현재는 문단(엔터) 기준으로만 이동합니다.

### 이미지
- 이미지 삽입: 상단바를 사용하여 이미지 삽입이 가능합니다.
- 이미지 드래그 앤 드롭: 사용자 PC 내 이미지, 혹은 브라우저 이미지를 드래그앤 드롭하여 이미지를 삽입할 수 있습니다.
- 이미지 붙여넣기: 이미지 `ctrl` + `c`, `v`를 통해 이미지를 삽입할 수 있습니다.
- 이미지 리사이즈 및 정렬: 이미지 호버 시 사이즈 조절 및 이미지 정렬이 가능합니다. 

### 리스트
모든 리스트는 엔터를 한번 더 입력하면 사라집니다.
- 번호 리스트: 번호 + `.` + `␣`를 통해 번호 리스트를 생성할 수 있습니다.
- 불릿 리스트: `-` or `*` + `␣`를 통해 불릿 리스트를 생성할 수 있습니다.
- 태스트 리스트: `[]`를 통해 태스크 리스트를 생성할 수 있습니다.

### 기타
- 탭: `tab`을 통해 4칸 앞으로 이동, `shift` + `tab`을 통해 4칸 뒤로 이동할 수 있습니다. 
- 코드
  - 코드 블럭: ```언어를 통해 코드 블럭을 생성할 수 있습니다.  
  - 코드: 백틱 및 `ctrl` + `E`를 통해 코드를 생성할 수 있습니다.
- 링크
  - 생성:
    - 상단바 및 단축키(`ctrl` + `K`)를 통해 링크를 생성할 수 있습니다.
    - `https://`가 없는 경우 자동으로 적용됩니다.
    - 드래그 한 영역이 존재하는 경우에만 활성화됩니다.
    - 기존 에디터에 url 주소 입력시 자동으로 하이퍼링크가 걸리게 됩니다.
  - 해제:
    - 상단바 및 단축키(`ctrl` + `K`)를 통해 링크를 해제할 수 있습니다.
    - 링크가 존재하는 경우에만 가능하며 커서가 링크 내부에 있는 경우에만 활성화됩니다.
---



## 이슈 / 한계 (Issues)
- **드래그 앤 드롭**
  - 리스트에서 텍스트 드래그 후 위치 이동 시, 빈 리스트가 남게 됩니다.
  - 코드 블럭에서 텍스트 드래그 후 위치 이동시 빈 코드 블럭이 남게 됩니다.
- **텍스트 이동**
  - 텍스트 상하 이동은 블럭 단위입니다.



## 참고 자료 (References)
- [Tiptap Docs](https://tiptap.dev/docs/editor/getting-started/overview)



## 라이선스 (License)
본 가이드는 MIT 라이선스 하에 공개합니다

- 공유 복제, 배포, 포맷 변경, 전송, 전시, 공연, 방송할 수 있습니다.
- 변경 리믹스, 변형, 2차적 저작물 작성 및 영리목적의 이용이 가능합니다.
