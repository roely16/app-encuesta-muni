<template>
    <div>

        <v-form ref="form" v-model="valid" @submit.prevent="registrar()">
            <v-row class="mt-4">

                <v-col md="4">
                    <v-autocomplete :rules="[v => !!v]" v-model="pregunta.codigo" autocomplete="off" :items="codigos" item-text="codigo" item-value="codigo" hide-details outlined label="Código"></v-autocomplete>
                </v-col>

                <v-col md="8">
                    <v-autocomplete :rules="[v => !!v]" v-model="pregunta.id_pregunta" autocomplete="off" :items="preguntas" item-text="nombre" item-value="id" hide-details outlined label="Pregunta"></v-autocomplete>
                </v-col>

                <v-col md="2">
                    <v-text-field :rules="[v => !!v]" v-model="pregunta.si" autocomplete="off" hide-details outlined label="SI"></v-text-field>
                </v-col>

                <v-col md="2">
                    <v-text-field :rules="[v => !!v]" v-model="pregunta.no" autocomplete="off" hide-details outlined label="NO"></v-text-field>
                </v-col>

            </v-row>

            <v-row>
                <v-col class="text-center">
                    <v-btn class="mr-2" color="secondary">
                        CANCELAR
                    </v-btn>

                    <v-btn type="submit" color="primary">
                        GUARDAR
                    </v-btn>

                </v-col>
            </v-row>
        </v-form>

    </div>
</template>

<script>

    import request from '@/functions/request.js'
    import alert from '@/functions/alert.js'

    export default {
        
        data(){
            return{
                preguntas: [],
                codigos: [],
                pregunta: {},
                valid: true
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

                })

            },
            registrar(){

                this.$refs.form.validate()

                if (this.valid) {
                    
                    const data = {
                        url: 'registrar_valoracion.php',
                        data: this.pregunta
                    }

                    request.post(data)
                    .then((response) => {

                        alert.show_alert(response.data)
                        console.log(response.data);

                    })

                }

            }

        },
        mounted(){

            this.obtener_datos_form()

        }
    

    }
</script>