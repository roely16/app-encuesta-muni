<template>
    <div>

        <v-form ref="form" v-model="valid" @submit.prevent="!idItem ? registrar() : editar()">
            <v-row class="mt-4">
                
                <v-col md="4">
                    <v-autocomplete :rules="[v => !!v]" v-model="pregunta.codigo" autocomplete="off" :items="codigos" item-text="codigo" item-value="codigo" hide-details outlined label="Código"></v-autocomplete>
                </v-col>

                <v-col md="8">
                    <v-autocomplete :rules="[v => !!v]" v-model="pregunta.id_pregunta" autocomplete="off" :items="preguntas" item-text="nombre" item-value="id" hide-details outlined label="Pregunta"></v-autocomplete>
                </v-col>

                

            </v-row>

            <v-row v-for="(extremo, index) in extremos" :key="index">
                <v-col md="3">
                    {{ extremo.inferior }}
                </v-col>
                <v-col md="1">
                    <v-text-field v-model="extremo.uno" autocomplete="off" hide-details outlined ></v-text-field>
                </v-col>

                <v-col md="1">
                    <v-text-field v-model="extremo.dos" autocomplete="off" hide-details outlined ></v-text-field>
                </v-col>

                <v-col md="1">
                    <v-text-field v-model="extremo.tres" autocomplete="off" hide-details outlined ></v-text-field>
                </v-col>

                <v-col md="1">
                    <v-text-field v-model="extremo.cuatro" autocomplete="off" hide-details outlined ></v-text-field>
                </v-col>

                <v-col md="1">
                    <v-text-field v-model="extremo.cinco" autocomplete="off" hide-details outlined ></v-text-field>
                </v-col>
                 <v-col align="end" md="3">
                    {{ extremo.superior }}
                </v-col>
            </v-row>

            <v-row>
                <v-col class="text-center">
                    <v-btn @click="$emit('closeModal')" class="mr-2" color="secondary">
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
    // eslint-disable-next-line no-unused-vars
    import alert from '@/functions/alert.js'

    export default {
        props: {
            idItem: String,
            tabla: String
        },
        data(){
            return{
                preguntas: [],
                codigos: [],
                pregunta: {

                },
                valid: true,
                extremos: []
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
                    
                    if (!this.idItem) {
                        
                        this.extremos = response.data.extremos

                    }

                })

            },
            registrar(){

                this.$refs.form.validate()

                    if (this.valid) {
                        
                        this.pregunta.extremos = this.extremos

                        const data = {
                            url: 'registrar_rango.php',
                            data: this.pregunta
                        }

                        request.post(data)
                        // eslint-disable-next-line no-unused-vars
                        .then((response) => {
                            
                            this.$emit('updateTable')
                            this.$emit('closeModal')
                            this.pregunta = {}
                            this.$refs.form.resetValidation()
                            this.valid = true
                            
                        })

                    }

            },
            detalle(){
                
                const data = {
                    url: 'obtener_detalle.php',
                    data: {
                        id: this.idItem,
                        tabla: this.tabla
                    }
                }

                request.post(data)
                .then((response) => {
                    this.pregunta = response.data
                    this.extremos = response.data.extremos
                })

            },
            editar(){

                this.pregunta.extremos = this.extremos

                const data = {
                    url: 'editar_rango.php',
                    data: this.pregunta
                }
                
                request.post(data)
                // eslint-disable-next-line no-unused-vars
                .then((response) => {

                    // alert.show_alert(response.data)
                    // .then((result) => {

                    //     if (result) {
                            
                    //     }

                    // })

                    this.$emit('updateTable')
                    this.$emit('closeModal')
                })

            }
        },
        watch: {
            idItem: function(val){

                if (val) {
                    this.detalle()
                }else{
                    this.obtener_datos_form()
                    this.pregunta = {}
                    this.$refs.form.resetValidation()
                    this.valid = true
                }

            }
        },
        mounted(){

            if (this.idItem) {
                this.obtener_datos_form()
                this.detalle()
                
            }else{

                this.obtener_datos_form()
                this.pregunta = {}
                this.$refs.form.resetValidation()
                this.valid = true

            }
            //this.obtener_datos_form()

        }
    

    }
</script>