import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'


export const CustomRate = () => {

    const [defaultRating, setDefaultRating] = useState(2)
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5])



    const starImgFilled = require("assets/images/StarImage.png")
    const starImgCorner = require("assets/images/logo.png")

    return (
        <View style={{ flex: 1 }}>

            {
                maxRating.map((item, key) => {
                    return (
                        <TouchableOpacity
                            key={item} onPress={() => setDefaultRating(item)}>

                            <Image source={
                                item <= defaultRating
                                    ? { starImgFilled }
                                    : { starImgCorner }

                            } />
                        </TouchableOpacity>


                    )

                }
                )}
        </View>
    )

}
export default CustomRate