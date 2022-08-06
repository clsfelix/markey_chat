
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
        dateIsInvalid: {
            type:'question',
            data:'Essa data é inválida, ou o profissional não atende neste dia da semana, por favor, escolha outra data'
        },
        selectHour:{
            type: 'question',
            data: '🕛 Escolha um horário'
        },
        selectOtherHour: {
            type:'question',
            data: '🕛 Ops! Parece que alguem foi mais rápido que você e agendou neste horário. Por favor, selecione outro horário'
        },
        indisponibleHour: {
            type:'question',
            data:'🕛 Esse horário não está mais disponível'
        },
        dontHaveHour:{
            type: 'question',
            data: '🕛 Esse profissional não possui mais horários disponíveis para esse serviço'
        },
        yourName: {
            type: 'question',
            data: 'Estamos quase finalizando, por favor, informe seu nome'
        },
        yourPhone: {
            type: 'question',
            data: '📅  Queremos te enviar um lembrete desse agendamento. Mas para isso precisamos do seu número de telefone'
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