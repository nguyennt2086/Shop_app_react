import React from "react";
import {StyleSheet, View, Text,Image} from 'react-native';
import colors from "../misc/colors";

const Demo= ({})=>{
    return(
        <View style={styles.container}>
             <View
             style={{width: 180, height:200, justifyContent:'center', alignItems:'center', backgroundColor:colors.BTNBACKGROUND, borderRadius:10,}}
             >
                <Image
                    style={styles.img}
                    source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX////+AAr+AAD+REf+YGH/urv+oKL+LC//9vb/7O3/dXb/4+P//v//8vL+eHn9AAr+Oz7+cHH/1NT+m5z/amr+IiX/k5P+gIL+0dL/3d7/trn/6Oj+ysz+V1r+l5n+xMb+qav+YmX9vr/9SE3+am3/EBr+MDb9io3+WVz/X2P/HR/+rq/+LjD+fID+Rkr92Np01yOrAAAE8ElEQVR4nO2aa3uiOhRGcTtVVBB1ioKiYhXtsZ36///dcFNJdoKMT63oedcz86HNdQFJdpIaBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/hf4IwnPvneXvpk5yUzv3aVv5hc1ROjlmGT1ZDr37Om1lBh2yBGh3/fs6bWUGso8n6GcBMNaAsPHN3zXr4dPYjhevYqsvGPSkxiW8KyGVv7/GsNZsHzJCDx9/GNV/B3Loch0uVwZsmFpTLNsrRxpQEfz1put6MeFXvWChFmetyxzNb3FsCsy9I4lK79DM1ynSuLzaKS/cxc+L/AmN7rJnsQsLGwEov6bWKrz0d1mSc56N51V0jNK51I7rko0bKlqGL3mck76r6CY/BSnDcTdSvz8WqzR5JsOBklFpyrSMPH8mpbN/Ck6WRK1W9X2ecr1cET8nRwbzbuT99XozYV84iNJf3T4jqzFGrUNe553X2jPzWd2f5DKO0Ii7ap8pxpDJlfMUZhExornoChBa+Gj4oam31BWRBQmBRbqZshVDIFvNewMqvhlPV0WZgZuGKgFG+ngN1faRPLUWt9k6Dskf5Y6HOFL5YaRvkX6PSBdKw45vRsa+qpu6Y3PAS831JHWVjoQ6P12hh1XKaieo9KOHv7ZsAIU3MzwPzlTPo1H+/1ePRO3b2I4vI2hZUypwSf37TjwO7bdOSy7e+5Iu3JDzcsvh9oXlsVr36Epf6Px9xkVlz27xadHsrWGyaq5b7t6SdKs0Q26MNcoDQ+XV/wP3v1ICrYP7CHQQmtINPFmZscPPzWDeL0IRl5rqyh5jeGsP4nps6R18uvJHzMu98UN2dLk8UVBZ0jOcRqyWLNJsnucT/7wotcYZtgs6RyXznhDc155VwroHBrpDINzQMCXP9qnFmmGNevV9YbavUXcUqiYRmbyEflsoamBr/jFVW3J6w7Pqf4PGU5YL+TdoXIk01pjGBb7xFIbxenSkZJvYRg78mFYDdIY+sXtrDydiAPgVd7T3cTQaFcwdBQhHJlqQ2FNk+N56hf9hz/yDk1FPFMFh/zrDAvcybCqYhZF1t7QMkw5XjkeLVzkMQxjRx55RJ/tCkTeQxhaaTFpRpublbAewjBmx9Kc8nYEam9o8bgj3lksn8FwcSpmEvtMvx7TULDIY64URYyf+RfWZt+VoUOaXiNDRzzELnyJLAA+fcTW8bIhiNha8ZkVrouhLZ+lxYpus+lmmoptHL0XGjsM5UuBuPioZoaK4DN5EVkGW47x09RBuPQ6XjDduaojgolRM0NXeRJL+ZXQUh6mxyegPVA5bRHqYmitlUfaR8O4nxWD0bzceZ6qiyGrSzI02Ba+VLBwrlkbw3HpV2okZxlVHUm4e6yNoWJFEA0Nb19JkWgrXIPVxjAeiGXjMM0yYcGNwk++PK6NoREop8STYbqw9zblh/HJVa187l4fQ2OqOi8T3mHiuIs0903pdXtoGvKfTfywoYxw5+5v+CnhC68l2G1Ve/xosFDe0fK/VJAMJbrF1I2cesGwP2iKDKRdkBm8heMiO/XdeSf4mMwH+Va++bWZtJYjU5nTMj7kRpuC4Uru0q6YupMKbyv/3QkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICn5i92eFrMv1ByLAAAAABJRU5ErkJggg=='}}
                />
                <Text
                 style={{marginTop:5,}}
                >R</Text>
                <Text
                style={{ marginBottom:10}}
                >t</Text>    
            </View>   

        </View>
    );
}

export default Demo;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.BACKGROUND,
    },
    img:{
        width: 150,
        height: 150,
        borderRadius: 10,
marginTop: 10,
    }
})