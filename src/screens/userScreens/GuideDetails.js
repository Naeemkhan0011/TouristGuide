import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserGuideDetailReducer } from '../../redux/reducers';
import { SagaActions } from '../../redux/sagas/SagaActions';

const GuideDetails = () => {
  const dispatch = useDispatch();
  const userGuideDetailResponse = useSelector(
    UserGuideDetailReducer.selectUserGuideDetailData
  )

  //hooks call
  useEffect(() => {
if(userGuideDetailResponse != null){
  if(userGuideDetailResponse?.error == false){
    console.log('userGuideDetailResponse',userGuideDetailResponse);
  }
}
  },[userGuideDetailResponse])

  //api call
  const callGuideDetailApi = () => {
    const payload = {
      uri : '/' + ''
    }
    dispatch({type:SagaActions.USER_GUIDE_DETAILS, payload})
  }
  return (
    <View>
      <Text>GuideDetails</Text>
    </View>
  )
}

export default GuideDetails

const styles = StyleSheet.create({})