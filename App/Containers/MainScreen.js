import React, { Component } from 'react';
import {
    AsyncStorage,
    ActivityIndicator,
    FlatList
} from 'react-native';
import Header from '../Components/Header';
import { connect } from 'react-redux';
import Container from '../Components/Container';
import SplashScreen from 'react-native-splash-screen'


class MainScreen extends Component {
    constructor (props) {
        super(props);
        this.state={
            canLoadMore: true,
            scrollLoading: false,
            params: {
                limit: 120,
                offset: 0
            }
        };

        this.renderList = this.renderList.bind(this);
        this.renderScrollActivityIndicator = this.renderScrollActivityIndicator.bind(this);
    }

    componentDidMount() {
        SplashScreen.hide();
    }

    renderScrollActivityIndicator() {
        if(this.state.scrollLoading){
            return  <ActivityIndicator
                color={'black'}
                animating={true}
                size="large"
            />;
        } else {
            return null;
        }
    }

    loadMoreData() {
        if (!this.state.scrollLoading && this.state.canLoadMore) {
            this.setState({
                scrollLoading: true,
            },() => {
                this.props.dispatch(
                    getList(this.state.params.limit, this.state.params.offset+this.state.params.limit))
                    .then(() => {
                        if (this.props.auth.list.length < this.state.params.offset + this.state.params.limit*2) {
                            this.setState({canLoadMore: false, scrollLoading: false})
                        } else {
                            this.setState({
                                scrollLoading: false,
                                params: {
                                    ...this.state.params,
                                    offset: this.state.params.offset + this.state.params.limit
                                }
                            })
                        }
                    })
            })
        }
    }

    renderList() {
        if (this.props.auth.list && this.props.auth.list.length) {
            const {list} = this.props.auth;
            return (
                <FlatList
                    keyExtractor={(item, i) => i.toString()}
                    data={list}
                    onEndReached={() => this.loadMoreData()}
                    onEndReachedThreshold={10}
                    ListFooterComponent={this.state.canLoadMore ? this.renderScrollActivityIndicator : null}
                    renderItem={({ item }) => (
                        <ListItem
                            onPress={() => {
                                this.props.navigation.navigate('NewsItemScreen', {title: item.address, article: item.about})
                            }}
                            isChecked={item.checkbox}
                            title={item.address}
                        />
                    )}
                />
            )
        }
    }

    onPressRightText = () => {
        AsyncStorage.removeItem(AsyncStorageConfig.AUTH);
        this.props.navigation.pop();
    };

    render () {
        return (
            <Container>
                <Header
                    title={'Home'}
                    rightText={'Sign Out'}
                    onPressRightText={this.onPressRightText}
                />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        auth: state.auth
    });
};

export default connect(mapStateToProps)(MainScreen)
