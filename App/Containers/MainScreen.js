import React, { Component } from 'react';
import {
    AsyncStorage,
    ActivityIndicator,
    FlatList,
    View,
    Text,
    StyleSheet,
    Keyboard,
    TouchableOpacity
} from 'react-native';
import Header from '../Components/Header';
import ListItem from '../Components/ListItem';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorageConfig from '../Config/AsyncStorageConfig';
import { searchRepositoriesByQuery, clearFoundObjects } from '../Redux/auth/actions';
import {
    Icon,
    Input,
    Item
} from 'native-base';

class MainScreen extends Component {

    constructor (props) {
        super(props);
        this.state = {
            searchPhrase: null,
            searchLoader: null,
            notFoundByQuery: false,
            canLoadMore: true,
            scrollLoading: false,
            params: {
                limit: 15,
                offset: 0
            }
        };

        this.searchTimer = null;
    }

    componentDidMount() {
        this.props.navigation.state.params.onCancelLoader();
        SplashScreen.hide();
    }

    renderScrollActivityIndicator = () => {
        if (this.state.scrollLoading) {
            return  <ActivityIndicator
                color={'black'}
                animating={true}
                size="large"
            />;
        } else {
            return null;
        }
    };

    loadMoreData() {
        if (!this.state.scrollLoading && this.state.canLoadMore) {
            this.setState(prevState => ({
                scrollLoading: true,
                params: {
                    ...prevState.params,
                    offset: prevState.params.offset + prevState.params.limit
                }
            }), () => {
                this.props.dispatch(searchRepositoriesByQuery(this.state.searchPhrase, this.state.params))
                    .then(() => {
                        if (this.props.auth.list.length < this.state.params.offset + this.state.params.limit) {
                            this.setState({ canLoadMore: false, scrollLoading: false });
                        } else {
                            this.setState({
                                scrollLoading: false,
                                params: {
                                    ...this.state.params,
                                    offset: this.state.params.offset + this.state.params.limit
                                }
                            });
                        }
                    });
            });
        }
    }

    renderList() {
        if (this.props.auth.list && this.props.auth.list.length) {
            const { list } = this.props.auth;
            return (
                <FlatList
                    onScroll={() => Keyboard.dismiss()}
                    keyExtractor={(item, i) => i.toString()}
                    data={list}
                    onEndReached={() => this.loadMoreData()}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={this.state.canLoadMore ? this.renderScrollActivityIndicator : null}
                    renderItem={({ item }) => (
                        <ListItem name={item.name} />
                        )
                    }
                />
            )
        } else if (this.state.searchLoader) {
            return <ActivityIndicator
                color={'black'}
                style={styles.marginTopText}
                size={'small'}
            />
        } else if (this.state.notFoundByQuery || (this.props.auth.list && !this.props.auth.list.length)){
            return <Text style={[styles.content, styles.marginTopText]}>Nothing</Text>
        }
    }

    onPressRightText = () => {
        AsyncStorage.removeItem(AsyncStorageConfig.USER_REGISTERED);
        this.props.navigation.pop();
    };

    findObjects = query => {
        this.props.dispatch(clearFoundObjects());

        if (this.searchTimer) {
            clearTimeout(this.searchTimer);
        }
        this.setState({
            searchPhrase: query,
            params: { limit: 15, offset: 0 }}, () => {
            this.searchTimer = setTimeout(() => {
                this.setState({ notFoundByQuery: false }, () => {
                    if (query.length >= 2) {
                        this.setState({ searchLoader: true }, () => {
                            this.props.dispatch(searchRepositoriesByQuery(query, this.state.params)).then(() => {
                                this.setState({ searchLoader: false });
                            }).catch(() => {
                                this.setState({ searchLoader: false, notFoundByQuery: true });
                            });
                        });
                    }
                });
            }, 350)
        });


    };

    render () {
        return (
            <View style={styles.full}>
                <Header
                    title={'Main'}
                    rightText={'Sign Out'}
                    onPressRightText={this.onPressRightText}
                />
                <View style={styles.content}>
                    <Item style={styles.item}>
                        <Icon active name='search' />
                        <Input
                            value={this.state.searchPhrase}
                            onChangeText={text => this.findObjects(text)}
                            placeholder='Enter repository'
                        />
                    </Item>
                </View>
                {this.renderList()}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return ({ auth: state.auth });
};

export default connect(mapStateToProps)(MainScreen);

const styles = StyleSheet.create({
    full: {
        flex: 1
    },
    item: {
        width: 320
    },
    content: {
        alignSelf: 'center'
    },
    marginTopText: {
        marginTop: 20
    }
});
