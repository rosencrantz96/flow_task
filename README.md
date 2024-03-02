# flow_task

파일 확장자 차단 과제 _ 권수경 

# 과제 설명

![](https://velog.velcdn.com/images/rosencrantz96/post/cba46ecf-563d-4499-b5ad-499ea04a1d02/image.png)

> **파일 확장자 차단**
>
어떤 파일들은 첨부 시 보안에 문제가 될 수 있다. 특히 exe, sh 등의 실행파일이 존재할 경우 서버에 올려서 실행이 될 수 있는 위험이 있어 파일 확장자 차단을 하게 되었다. 

# 요건

> **고정 확장자 DB 저장**

1-1. 고정 확장자는 차단을 자주하는 확장자들 리스트, default는 unCheck

1-2. 고정 확장자를 check or uncheck 할 경우 db에 저장되며, 새로고침 시 유지되어야 한다. (아래쪽 커스텀 확장자에는 표현되지 않는다.)

> **커스텀 확장자 조건**

2-1. 확장자 최대 입력 길이는 20자리

2-2. 추가 버튼 클릭 시 db 저장되며, 아래쪽 영역에 표현된다. 

>  **커스텀 확장자 추가, 삭제**

3-1. 커스텀 확장자는 최대 200개까지 추가가 가능하다 

3-2. 확장자 옆 x를 클릭할 경우 db에서 삭제

> **그 외** 
그 밖의 기능이나 조건 자유롭게 생각해보기

- [x] 커스텀 확장자 중복 체크 
- [x] 확장자에 영어만 가능하도록 정규표현식으로 제한 
- [x] 확장자 내용이 없는 경우 추가되지 않도록 제한 
- [x] 동일한 확장자 중복 체크를 위해 데이터는 모두 소문자로 저장 
- [x] 고정확장자인 경우 재 추가가 안 되도록 제한 
- [x] 커스텀 확장자는 최대200개 개수 제한 
- [x] 어플리케이션 실행 시 초기 데이터로 고정 확장자 정보 저장되도록 구현 
- [ ] 추가버튼 혹은 엔터키로도 커스텀 확장자 추가 가능하도록 해보기
- [ ] 확장자 테스트 되는지 확인부 추가(업로드 기능 추가해보기)
- [ ] 고정확장자를 늘리거나 줄여야 하는 경우를 생각해서 기능 구현해보기

# 구현 내용

## 화면

![image](https://github.com/rosencrantz96/flow_task/assets/115062680/76007485-5fb0-4436-9604-4c688efd85ca)

## ERD 설계
![image](https://github.com/rosencrantz96/flow_task/assets/115062680/5f5d0e43-9f54-4bc4-b2c2-771f48db25e4)

고정 확장자를 저장하는 테이블과 커스텀 확장자를 저장하는 테이블을 따로 구성하였습니다.
고정 확장자는 `is_checked` 컬럼을 두어 체크박스 상태를 저장할 수 있도록 하였습니다. 
User 테이블이 생긴다면 연관 테이블로 만들 수 있지 않을까 생각했습니다. 

## 기능 설명
1. 고정 확장자 체크

![image](https://github.com/rosencrantz96/flow_task/assets/115062680/caaa906b-32df-49c5-bd47-15d4f54648aa)
체크 박스에 체크를 하면 `is_checked`가 true가 되고, 다시 체크를 해제하면 false인 상태가 됩니다. 
true인 상태라면 `checked` 상태를 주어 새로고침 시에도 체크 박스가 유지될 수 있도록 하였습니다. 

2. 커스텀 확장자 추가

![image](https://github.com/rosencrantz96/flow_task/assets/115062680/95386fa0-1c35-4902-b519-02214556c529)

고정확장자에 존재하지 않을 것, 중복되지 않을 것, 영어 소문자만 입력 가능할 것, 빈칸이나 띄어쓰기가 불가할 것, 총 200개가 넘지 않을 것
이 다섯가지 사항을 고려하여 추가 기능을 만들었습니다. 

3. 커스텀 확장자 추가 확인, 조회 및 삭제

![image](https://github.com/rosencrantz96/flow_task/assets/115062680/770e3e3f-8e9a-464c-9a0d-a11d77e7ad1a)

최신순으로 정렬이 되도록 하였으며 x 버튼을 누를 시 삭제가 됩니다. 
커스텀 확장자가 추가되거나 삭제가 될 경우 `location.reload();`를 주어 사용자가 새로고침하지 않아도 화면에 바로 반영될 수 있도록 하였습니다. 

## aws 배포 

하지만 AWS에 배포를 성공하지 못하였습니다. 
첫 번째 배포 시도에서는 로드밸런싱을 잘못해서 https 설정에 실패해서 502gate를 만날 수밖에 없었고...

이후 배포를 두 차례 더  시도했지만 codeDeploy에서 막혀 실패... 
![image](https://github.com/rosencrantz96/flow_task/assets/115062680/7b881027-a190-4b04-a40a-f7b30015dcfd)

문제 원인을 더 찾아보고 배포가 가능하다면 완료해보는 것을 목표로 하고 있습니다. 

# BackEnd Setting

### Tech Stack

<img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white"/> +
<img src="https://img.shields.io/badge/typescript-3178C6?style=flat&logo=typescript&logoColor=white"/>

<img src="https://img.shields.io/badge/mySQL-4479A1?style=flat&logo=MySQL&logoColor=white"/>

<br>

### 0. 로컬환경에서 혹여나 TS 혹은 ts-node가 깔려 있지 않을 경우

```bash
npm i typescript ts-node -g
```

---

### 1. BackEnd 실행 방법

```bash
npm i

# 배포환경
npm run build
npm run start

# 개발환경
npm run start:dev
```
### 2. commit convention
fix: for bug fixes  
feat: for new features  
docs: for documentation changes  
style: code formatting, whitespace modifications, or improvements to code style  
refactor: for code refactoring  
test: for adding or modifying tests  
chore: for updates to dependencies, configuration changes, or modifications to build scripts.  
