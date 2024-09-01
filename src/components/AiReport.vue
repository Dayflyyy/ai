<template>
  <el-container>
    <el-header
      ><el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="headtitle grid-content bg-purple-light">Ai报告</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col> </el-row
    ></el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main>
          <el-row :gutter="20">
            <el-col :span="10"
              ><div class="grid-content bg-purple">
                <div class="center">
                  <vs-table v-model="selected">
                    <template #thead>
                      <vs-tr>
                        <vs-th> Name </vs-th>
                        <vs-th> Email </vs-th>
                        <vs-th> Id </vs-th>
                      </vs-tr>
                    </template>
                    <template #tbody>
                      <vs-tr
                        :key="i"
                        v-for="(tr, i) in users"
                        :data="tr"
                        :is-selected="selected == tr"
                      >
                        <vs-td>
                          {{ tr.name }}
                        </vs-td>
                        <vs-td>
                          {{ tr.email }}
                        </vs-td>
                        <vs-td>
                          {{ tr.id }}
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
                  <span class="data">
                    <pre
                      >{{ selected ? selected : "Select an item in the table" }}
                    </pre>
                  </span>
                </div>
              </div>
            </el-col>
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                <vs-card>
                  <template #title>
                    <h3>Pot with a plant</h3>
                  </template>
                  <template #img>
                    <img src="../assets/LOGOdayfly.jpg" alt="" />
                  </template>
                  <template #text>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                  </template>
                  <template #interactions> </template>
                </vs-card></div
            ></el-col>
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                <vs-card>
                  <template #title>
                    <h3>Ai智能分析</h3>
                  </template>
                  <template #text>
                    <p>
                      新能源汽车是指采用非常规的车用燃料作为动力来源（或使用常规的车用燃料、采用新型车载动力装置），综合车辆的动力控制和驱动方面的先进技术，形成的技术原理先进、具有新技术、新结构的汽车。
                      [1]新能源汽车包括纯电动汽车、增程式电动汽车、混合动力汽车、燃料电池电动汽车、氢发动机汽车等。
                      [2]
                      2020年11月，国务院办公厅印发《新能源汽车产业发展规划（2021—2035年）》，要求深入实施发展新能源汽车国家战略，推动中国新能源汽车产业高质量可持续发展，加快建设汽车强国。
                      [3-4]
                      2021年，全年新能源汽车产量367.7万辆，比上年增长152.5%，结束了连续三年的负增长；中国汽车工业协会最新统计显示，2022年中国新能源汽车产销分别完成705.8万辆和688.7万辆，同比分别增长96.9%和93.4%，连续8年保持全球第一。
                      [36]
                      2023年2月28日，国家统计局发布《中华人民共和国2022年国民经济和社会发展统计公报》显示：2022年全年新能源汽车产量700.3万辆，比上年增长90.5%。
                      [41]截至2023年7月3日，中国新能源汽车产量达到2000万辆。
                      [47]2023年上半年，新能源汽车361.1万辆，增长35.0%。
                      [50]截至2023年9月底，新能源汽车1821万辆。 [52]
                      2024年3月，中国汽车产销分别完成268.7万辆和269.4万辆，同比分别增长4%和9.9%。其中，新能源汽车产销分别完成86.3万辆和88.3万辆，同比分别增长28.1%和35.3%。
                    </p>
                  </template>
                  <template #interactions> </template>
                </vs-card></div
            ></el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data: () => ({
    selected: null,
    users: [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        website: "hildegard.org",
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        website: "anastasia.net",
      },
      {
        id: 3,
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
        website: "ramiro.info",
      },
      {
        id: 4,
        name: "Patricia Lebsack",
        username: "Karianne",
        email: "Julianne.OConner@kory.org",
        website: "kale.biz",
      },
      {
        id: 5,
        name: "Chelsey Dietrich",
        username: "Kamren",
        email: "Lucio_Hettinger@annie.ca",
        website: "demarco.info",
      },
      {
        id: 6,
        name: "Mrs. Dennis Schulist",
        username: "Leopoldo_Corkery",
        email: "Karley_Dach@jasper.info",
        website: "ola.org",
      },
      {
        id: 7,
        name: "Kurtis Weissnat",
        username: "Elwyn.Skiles",
        email: "Telly.Hoeger@billy.biz",
        website: "elvis.io",
      },
      {
        id: 8,
        name: "Nicholas Runolfsdottir V",
        username: "Maxime_Nienow",
        email: "Sherwood@rosamond.me",
        website: "jacynthe.com",
      },
      {
        id: 9,
        name: "Glenna Reichert",
        username: "Delphine",
        email: "Chaim_McDermott@dana.io",
        website: "conrad.com",
      },
      {
        id: 10,
        name: "Clementina DuBuque",
        username: "Moriah.Stanton",
        email: "Rey.Padberg@karina.biz",
        website: "ambrose.net",
      },
    ],
  }),
};
</script>

<style scoped>
.headtitle{
    font-size: 40px;
    font-weight: 700;
    color: #0a0a0a;
    margin-bottom: 20px;
}
</style>
