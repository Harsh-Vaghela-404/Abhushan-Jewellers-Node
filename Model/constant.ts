import dateFormat from "dateformat";
export let return_with_data = {
    error: true,
    message:'',
    data:[]
}

export let {...return_without_data} = {
    error: true,
    message:''
}

export function output(status_code: number, status_message: any, data: any = null) {

    let output = {
        status_code: status_code.toString(),
        status_message: status_message,
        datetime: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
        data: data
    };

    return output;
}