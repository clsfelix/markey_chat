
export const questions = (question, complement="") => {
    const options = {
        hello:{
            type:'question',
            data:`Olá, tudo bem? Sou o secretário virtual do ${complement}`
        },
        iHelpYou:{
            type: 'question',
            data: 'Vou te ajudar a marcar um novo horário, vamos lá?'
        },
        selectDate: {
            type:'question',
            data: '📅 Qual dia você deseja agendar?'
        },
        selectHour:{
            type: 'question',
            data: '🕛 Escolha um horário'
        },
        yourName: {
            type: 'question',
            data: 'Estamos quase finalizando, por favor, informe seu nome'
        }
    }
    return options[question];
}

export const establishmentQuestion = () => {

    return [
        {
            type: 'question',
            data: 'Selecione uma unidade'
        },
        {
            type: 'selectEstablishment',
            data: ''
        },
    ]
}


export const professionalsQuestion = (professionals) => {
    return [
        {
            type: 'question',
            data: 'Selecione um profissional'
        },
        {
            type:'selectProfessional',
            data: professionals
        }
    ]
}


export const servicesQuestion = (services) => {
    
    return [
        {
            type: 'question',
            data: "Selecione um de nossos serviços 😌"
        },
        {
            type: 'selectServices',
            data: services
        }
    ]
}