import {
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import config from '../config';

const CancellationPolicyModal = ({setModalOpen, modalOpen}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalOpen}
      onRequestClose={() => {
        setModalOpen(!modalOpen);
      }}>
         <StatusBar
        barStyle="light-content"
        backgroundColor='rgba(60, 61, 62, 0.8)'
       
      />
      <View
        style={{
          flex: 1,
          width: `100%`,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(60, 61, 62, 0.8)',
        }}>
        <View
          style={{
            height: config.constants.Height / 1.5,

            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            backgroundColor: config.colors.white,
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 25}}
            nestedScrollEnabled>
            <View
              style={{
                marginTop: 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: config.fonts.HeadingFont,
                  fontSize: 24,
                  color: config.colors.blackColor,
                }}>{`Cancellation Policy`}</Text>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                activeOpacity={0.8}
                onPress={() => setModalOpen(false)}>
                <Image
                  source={config.images.CLOSE_ICON}
                  style={{height: 24, width: 24, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 20,
                height: 200,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: config.fonts.MediumFont,
                  fontSize: 13,
                  color: config.colors.blackColor,
                  lineHeight: 20,
                }}>
                {`Before you book, kindly consider the availability of your schedule, as our listeners sets aside their time for your session.\n \nHowever, we understand there may be unforeseen circumstances and we advise cancellation to be done at least`}
                <Text
                  style={{
                    fontFamily: config.fonts.BigHeadingFont,
                    fontSize: 13,
                    color: config.colors.fullBlack,
                    lineHeight: 20,
                  }}>{` 24 hours in advance `}</Text>
                {`so others may benefit from your time slot.`}
              </Text>
            </View>

            <Text
              style={{
                fontFamily: config.fonts.HeadingFont,
                fontSize: 16,
                color: config.colors.white,
                backgroundColor: config.colors.orangeColor,
                alignSelf: 'flex-start',
                paddingHorizontal: 8,
                borderRadius: 6,
                paddingVertical: 2,
              }}>{`For Beta App`}</Text>
            <View style={{marginTop: 10}}>
              <Text
                style={{
                  fontFamily: config.fonts.HeadingFont,
                  fontSize: 12,
                  color: config.colors.orangeColor,
                  marginTop: 4,
                }}>{`Cancel / Reschedule 24 hours in advance:`}</Text>
              <Text
                style={{
                  fontFamily: config.fonts.MediumFont,
                  fontSize: 12,
                  color: config.colors.blackColor,
                  marginTop: 4,
                }}>{`No Penalty.`}</Text>
            </View>
            <View style={{marginTop: 10}}>
              <Text
                style={{
                  fontFamily: config.fonts.HeadingFont,
                  fontSize: 12,
                  color: config.colors.orangeColor,
                  marginTop: 4,
                }}>{`Cancel`}  <Text
                style={{
                  fontFamily: config.fonts.HeadingFont,
                  fontSize: 12,
                  textDecorationLine:'underline',
                  color: config.colors.orangeColor,
                  marginTop: 4,
                }}>{`less then`}</Text> {`24 hours in advance:`}</Text>
              <Text
                style={{
                  fontFamily: config.fonts.HeadingFont,
                  fontSize: 12,
                  color: config.colors.orangeColor,
                  marginTop: 4,
                }}>{`(No rescheduling)`}</Text>
              <Text
                style={{
                  fontFamily: config.fonts.MediumFont,
                  fontSize: 12,
                  color: config.colors.blackColor,
                  marginTop: 4,
                }}>{`Suspended from use of Beta Promo Code for 7 days.`}</Text>
              <Text
                style={{
                  fontFamily: config.fonts.PrimaryFont,
                  fontSize: 12,
                  color: config.colors.greyColor,
                  marginTop: 4,
                }}>{`Beta Promo Code: IHearUBeta2024`}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CancellationPolicyModal;

const styles = StyleSheet.create({});
