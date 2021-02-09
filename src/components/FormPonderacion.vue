<template>
    <div>

        <v-form>
            <v-row class="mt-4">
                
                <v-col md="4">
                    <v-autocomplete autocomplete="off" :items="codigos" item-text="codigo" item-value="codigo" hide-details outlined label="Código"></v-autocomplete>
                </v-col>

                <v-col md="8">
                    <v-autocomplete autocomplete="off" :items="preguntas" item-text="nombre" item-value="id" hide-details outlined label="Pregunta"></v-autocomplete>
                </v-col>

                <v-col md="2">
                    <v-text-field autocomplete="off" hide-details outlined label="Bien"></v-text-field>
                </v-col>

                <v-col md="2">
                    <v-text-field autocomplete="off" hide-details outlined label="Regular"></v-text-field>
                </v-col>

                <v-col md="2">
                    <v-text-field autocomplete="off" hide-details outlined label="Mal"></v-text-field>
                </v-col>

                <v-col md="2">
                    <v-text-field autocomplete="off" hide-details outlined label="No encara el problema"></v-text-field>
                </v-col>

                <v-col md="2">
                    <v-text-field autocomplete="off" hide-details outlined label="NS/NR"></v-text-field>
                </v-col>

            </v-row>

            <v-row>
                <v-col class="text-center">
                    <v-btn class="mr-2" color="secondary">
                        CANCELAR
                    </v-btn>

                    <v-btn color="primary">
                        GUARDAR
                    </v-btn>

                </v-col>
            </v-row>
        </v-form>

    </div>
</template>

<script>

    import request from '@/functions/request.js'

    export default {
        
        data(){
            return{
                preguntas: [],
                codigos: []
            }
        },
        methods: {

            obtener_datos_form(){

                const data = {

                    url: 'datos_form.php',
                    data: null

                }

                request.post(data)
                .then((response) => {

                    this.codigos = response.data.codigos
                    this.preguntas = response.data.preguntas
                    console.log(response.data);

                })

            }

        },
        mounted(){

            this.obtener_datos_form()

        }
    

    }
</script>