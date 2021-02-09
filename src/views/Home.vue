<template>
  <div class="home">
    <v-row class="mt-4" justify="center" align="center">
      <v-col md="6">
        <v-text-field hide-details outlined label="Buscar..."></v-text-field>
      </v-col>
      <v-col align="end" md="6">
        
        <v-menu
      top
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          AGREGAR
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="mostrar_modal(item.form)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>

      </v-menu>
      </v-col>
    </v-row>


    <v-row class="mt-4">
      <v-col>
        <v-data-table></v-data-table>
      </v-col>
    </v-row>

    <Modal ref="modal">

      <template #form>
        <FormValoracion v-if="form == 'valoracion'"></FormValoracion>
        <FormPonderacion v-if="form === 'ponderacion'"></FormPonderacion>
      </template>

    </Modal>
  </div>
</template>

<script>

  import Modal from '@/components/Modal'
  import FormValoracion from '@/components/FormValoracion'
  import FormPonderacion from '@/components/FormPonderacion'

  export default {
    name: 'Home',
    components: {
      Modal,
      FormValoracion,
      FormPonderacion
    },
    data(){
      return{
        items: [
          { title: 'Valoración', form: 'valoracion' },
          { title: 'Ponderación', form: 'ponderacion' },
          { title: 'Rango', form: 'rango' },
        ],
        form: null
      }
    },
    methods: {

      mostrar_modal(form){

        this.form = form
        this.$refs.modal.show()

      }

    }
  }
</script>
