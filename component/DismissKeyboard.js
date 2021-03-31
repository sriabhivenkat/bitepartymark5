const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}> 
    {children}
    </TouchableWithoutFeedback>
    );
export default DismissKeyboard