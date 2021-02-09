<template>
  <div class="home">
    <v-row class="mt-4" justify="center" align="center">
      <v-col md="6">
        <v-text-field v-model="search" hide-details outlined label="Buscar..."></v-text-field>
      </v-col>
      <v-col align="end" md="6">
          <v-btn
          color="primary"
          dark
          @click="mostrar_modal()"
        >
          AGREGAR
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>


    <v-row>
      <v-col cols="3">
        <v-select :items="tablas" item-text="text" item-value="id" outlined label="Tabla" hide-details v-model="tabla"></v-select>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col>
        <v-data-table :search="search" :headers="headers" :items="items">

          <template v-slot:[`item.action`]="data">
            <v-btn icon color="primary" @click="mostrar_editar(data.item)">
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>

            <v-btn icon color="red" @click="eliminar(data.item)">
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </template> 

        </v-data-table>
      </v-col>
    </v-row>

    <Modal @closeModal="close_modal" ref="modal">

      <template #form>
        <FormValoracion :tabla="tabla" :idItem="idItem" @updateTable="obtener_registros" @closeModal="close_modal" v-if="form == 'valoracion'"></FormValoracion>
        <FormPonderacion :tabla="tabla" :idItem="idItem" @updateTable="obtener_registros" @closeModal="close_modal" v-if="form === 'ponderacion'"></FormPonderacion>
        <FormRango :tabla="tabla" :idItem="idItem" @updateTable="obtener_registros" @closeModal="close_modal" v-if="form === 'rango'"></FormRango>
      </template>

    </Modal>
  </div>
</template>

<script>
  import Swal from 'sweetalert2'

  import Modal from '@/components/Modal'
  import FormValoracion from '@/components/FormValoracion'
  import FormPonderacion from '@/components/FormPonderacion'
  import FormRango from '@/components/FormRango'

  import request from '@/functions/request.js'
  import alert from '@/functions/alert.js'

  export default {
    name: 'Home',
    components: {
      Modal,
      FormValoracion,
      FormPonderacion,
      FormRango
    },
    data(){
      return{
        options: [
          { title: 'Valoración', form: 'valoracion' },
          { title: 'Ponderación', form: 'ponderacion' },
          { title: 'Rango', form: 'rango' },
        ],
        form: null,
        items: [],
        headers: [],
        tabla: 'valoracion',
        tablas: [
          {
            id: "valoracion",
            text: "Valoración"
          },
          {
            id: "ponderacion",
            text: "Ponderación"
          },
          {
            id: "rango",
            text: "Rango"
          }
        ],
        search: null
      }
    },
    methods: {

      mostrar_modal(){

        this.form = this.tabla
        this.idItem = null
        this.$refs.modal.show()

      },
      close_modal(){

        this.idItem = null
        this.$refs.modal.close()

      },
      obtener_registros(){

        const data = {
          url: 'obtener_registros.php',
          data: {
            table: this.tabla
          }
        }

        request.post(data)
        .then((response) => {
          this.items = response.data.items
          this.headers = response.data.headers
        })

      },
      mostrar_editar(item){

        this.idItem = item.id
        this.form = this.tabla
        this.$refs.modal.show()
        
      },
      eliminar(item){

        const data = {

          url: 'eliminar.php',
          data: {
            id: item.id,
            tabla: this.tabla
          }

        }

        Swal.fire({
          title: '¿Está seguro?',
          text: "Una vez eliminado no se podrá recuperar!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, ELIMINAR!',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {

            request.post(data)
            .then((response) => {
              console.log(response.data);

              alert.show_alert(response.data)
              .then((result) => {

                if (result) {
                  this.obtener_registros()
                }

              })

            })

          }
        })

      }
    },
    watch: {

      tabla: function(){

        this.obtener_registros()

      }

    },  
    mounted(){

      this.obtener_registros()

    }
  }
</script>
