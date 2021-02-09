<template>
    <div>

        <v-dialog
            v-model="dialog"
            width="900"
        >

            <v-card>
                <v-card-title class="headline grey lighten-2">
                Agregar Resultados
                </v-card-title>

                <v-card-text>
                
                    <slot name="form"></slot>

                </v-card-text>

            
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
    methods: {
        
        show(){

            this.dialog = true

        }

    }
  }
</script>