<template>
  <section>
    <div class="logo-container">
      <img id="logo" src="/DKlontong.svg" alt="" />
    </div>
    <div class="address-1">
      <div>
        <p>JAKARTA</p>
      </div>
      <div>
        <p>
          123 Jalan Sudirman
          <br />
          +62 123 456 789
          <br />
          jakarta@example.com
          <br />
          Jakarta Pusat, DKI Jakarta Indonesia
        </p>
      </div>
    </div>
    <div class="address-2">
      <div>
        <p>SINGAPORE</p>
      </div>
      <div>
        <p>
          456 Orchard Road
          <br />
          singapore@example.com
          <br />
          +65 9876 5432
          <br />
          Singapore 238879
        </p>
      </div>
    </div>
    <div class="contact">
      <div>
        <p>
          WANT TO KNOW MORE ABOUT DKLONTONG?
          <br />
          CONTACT US!
        </p>
      </div>
      <div class="social-media">
        <img id="instagram" src="/instagram.svg" alt="" />
        <img id="github" src="/github.svg" alt="" />
        <img id="linkedin" src="/linkedin.svg" alt="" />
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  height: 220px;
  background-color: #f4ab6a;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

#logo {
  height: 210px;
  width: 210px;
}

.address-1 {
  margin-top: 20px;
  padding: 10px;
  display: grid;
  grid-template-rows: 0.5fr 1fr;
}
.address-2 {
  margin-top: 20px;
  padding: 10px;
  display: grid;
  grid-template-rows: 0.5fr 1fr;
}

.contact {
  margin-top: 20px;
  padding: 10px;
  display: grid;
  grid-template-rows: 0.5fr 1fr;
}

.social-media {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

p {
  font-size: 13px;
  font-weight: bold;
}

#instagram,
#github,
#linkedin {
  height: 25px;
  width: 25px;
  margin-right: 10px;
}
</style>
