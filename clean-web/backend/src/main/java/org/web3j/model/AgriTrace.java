package org.web3j.model;

import io.reactivex.Flowable;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.DynamicArray;
import org.web3j.abi.datatypes.DynamicStruct;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.BaseEventResponse;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple5;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/web3j/web3j/tree/master/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 4.10.3.
 */
@SuppressWarnings("rawtypes")
public class AgriTrace extends Contract {
    public static final String BINARY = "0x608060405234801561001057600080fd5b506118bd806100206000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c806345eea6301161006657806345eea630146101165780635441c76b1461013a57806354b758361461015a57806373aa46bb1461016d5780638108d70c1461018057610093565b80631f46b3fe146100985780632008bfd1146100c15780632fa8db04146100d65780633f52aa2c146100f6575b600080fd5b6100ab6100a636600461120a565b610193565b6040516100b891906115ad565b60405180910390f35b6100d46100cf36600461132a565b61043c565b005b6100e96100e436600461120a565b6105a8565b6040516100b8919061160d565b61010961010436600461120a565b61083b565b6040516100b89190611526565b61012961012436600461120a565b6109aa565b6040516100b8959493929190611716565b61014d610148366004611245565b610c3e565b6040516100b89190611660565b6100d461016836600461132a565b610d03565b6100d461017b366004611245565b610e60565b6100d461018e3660046112a6565b610f81565b6060816000816040516101a6919061146f565b9081526040519081900360200190206004015460ff600160a01b909104166101e95760405162461bcd60e51b81526004016101e0906117d4565b60405180910390fd5b6002836040516101f9919061146f565b9081526020016040518091039020805480602002602001604051908101604052809291908181526020016000905b8282101561042f57838290600052602060002090600502016040518060a0016040529081600082015481526020016001820180546102649061183c565b80601f01602080910402602001604051908101604052809291908181526020018280546102909061183c565b80156102dd5780601f106102b2576101008083540402835291602001916102dd565b820191906000526020600020905b8154815290600101906020018083116102c057829003601f168201915b505050505081526020016002820180546102f69061183c565b80601f01602080910402602001604051908101604052809291908181526020018280546103229061183c565b801561036f5780601f106103445761010080835404028352916020019161036f565b820191906000526020600020905b81548152906001019060200180831161035257829003601f168201915b505050505081526020016003820180546103889061183c565b80601f01602080910402602001604051908101604052809291908181526020018280546103b49061183c565b80156104015780601f106103d657610100808354040283529160200191610401565b820191906000526020600020905b8154815290600101906020018083116103e457829003601f168201915b5050509183525050600491909101546001600160a01b03166020918201529082526001929092019101610227565b5050505091505b50919050565b8360008160405161044d919061146f565b9081526040519081900360200190206004015460ff600160a01b909104166104875760405162461bcd60e51b81526004016101e0906117d4565b600385604051610497919061146f565b908152604080516020928190038301812060a0820183524282528382018881529282018790526060820186905233608083015280546001808201835560009283529185902083516005909202019081559251805192946104fd93928501929101906110f0565b50604082015180516105199160028401916020909101906110f0565b50606082015180516105359160038401916020909101906110f0565b5060809190910151600490910180546001600160a01b0319166001600160a01b0390921691909117905560405133907f0de00c8c8594c19d73d8eee9813fa89fa9291f5cf8fa070a7facdf7cb68e211390610599908890889088908890429061166b565b60405180910390a25050505050565b6060816000816040516105bb919061146f565b9081526040519081900360200190206004015460ff600160a01b909104166105f55760405162461bcd60e51b81526004016101e0906117d4565b600383604051610605919061146f565b9081526020016040518091039020805480602002602001604051908101604052809291908181526020016000905b8282101561042f57838290600052602060002090600502016040518060a0016040529081600082015481526020016001820180546106709061183c565b80601f016020809104026020016040519081016040528092919081815260200182805461069c9061183c565b80156106e95780601f106106be576101008083540402835291602001916106e9565b820191906000526020600020905b8154815290600101906020018083116106cc57829003601f168201915b505050505081526020016002820180546107029061183c565b80601f016020809104026020016040519081016040528092919081815260200182805461072e9061183c565b801561077b5780601f106107505761010080835404028352916020019161077b565b820191906000526020600020905b81548152906001019060200180831161075e57829003601f168201915b505050505081526020016003820180546107949061183c565b80601f01602080910402602001604051908101604052809291908181526020018280546107c09061183c565b801561080d5780601f106107e25761010080835404028352916020019161080d565b820191906000526020600020905b8154815290600101906020018083116107f057829003601f168201915b5050509183525050600491909101546001600160a01b03166020918201529082526001929092019101610633565b60608160008160405161084e919061146f565b9081526040519081900360200190206004015460ff600160a01b909104166108885760405162461bcd60e51b81526004016101e0906117d4565b600183604051610898919061146f565b9081526020016040518091039020805480602002602001604051908101604052809291908181526020016000905b8282101561042f5783829060005260206000209060030201604051806060016040529081600082015481526020016001820180546109039061183c565b80601f016020809104026020016040519081016040528092919081815260200182805461092f9061183c565b801561097c5780601f106109515761010080835404028352916020019161097c565b820191906000526020600020905b81548152906001019060200180831161095f57829003601f168201915b5050509183525050600291909101546001600160a01b031660209182015290825260019290920191016108c6565b6060806060600080856000816040516109c3919061146f565b9081526040519081900360200190206004015460ff600160a01b909104166109fd5760405162461bcd60e51b81526004016101e0906117d4565b60008088604051610a0e919061146f565b90815260200160405180910390206040518060c0016040529081600082018054610a379061183c565b80601f0160208091040260200160405190810160405280929190818152602001828054610a639061183c565b8015610ab05780601f10610a8557610100808354040283529160200191610ab0565b820191906000526020600020905b815481529060010190602001808311610a9357829003601f168201915b50505050508152602001600182018054610ac99061183c565b80601f0160208091040260200160405190810160405280929190818152602001828054610af59061183c565b8015610b425780601f10610b1757610100808354040283529160200191610b42565b820191906000526020600020905b815481529060010190602001808311610b2557829003601f168201915b50505050508152602001600282018054610b5b9061183c565b80601f0160208091040260200160405190810160405280929190818152602001828054610b879061183c565b8015610bd45780601f10610ba957610100808354040283529160200191610bd4565b820191906000526020600020905b815481529060010190602001808311610bb757829003601f168201915b505050918352505060038201546020808301919091526004909201546001600160a01b038116604080840191909152600160a01b90910460ff1615156060928301528351928401519084015191840151608090940151929c909b5090995091975095509350505050565b600082600081604051610c51919061146f565b9081526040519081900360200190206004015460ff600160a01b90910416610c8b5760405162461bcd60e51b81526004016101e0906117d4565b82604051602001610c9c919061146f565b60405160208183030381529060405280519060200120600085604051610cc2919061146f565b9081526020016040518091039020600101604051602001610ce3919061148b565b604051602081830303815290604052805190602001201491505092915050565b83600081604051610d14919061146f565b9081526040519081900360200190206004015460ff600160a01b90910416610d4e5760405162461bcd60e51b81526004016101e0906117d4565b600285604051610d5e919061146f565b908152604080516020928190038301812060a082018352428252838201888152928201879052606082018690523360808301528054600180820183556000928352918590208351600590920201908155925180519294610dc493928501929101906110f0565b5060408201518051610de09160028401916020909101906110f0565b5060608201518051610dfc9160038401916020909101906110f0565b5060809190910151600490910180546001600160a01b0319166001600160a01b0390921691909117905560405133907ffeacd3df4e49d2f114bd15cfc0182a431b28bebb4478e82848c7f1a3be26325e90610599908890889088908890429061166b565b81600081604051610e71919061146f565b9081526040519081900360200190206004015460ff600160a01b90910416610eab5760405162461bcd60e51b81526004016101e0906117d4565b600183604051610ebb919061146f565b908152604080516020928190038301812060608201835242825283820186815233938301939093528054600180820183556000928352918590208351600390920201908155925180519294610f1693928501929101906110f0565b5060409182015160029190910180546001600160a01b0319166001600160a01b039092169190911790555133907fedab087c103694a22683609f3f0ee0361d3144ab5c3249fc0949885dd3cfd1da90610f7490869086904290611772565b60405180910390a2505050565b600083604051610f91919061146f565b9081526040519081900360200190206004015460ff600160a01b9091041615610fcc5760405162461bcd60e51b81526004016101e0906117a8565b6040805160c08101825284815260208101849052808201839052426060820152336080820152600160a0820152905160009061100990869061146f565b908152602001604051809103902060008201518160000190805190602001906110339291906110f0565b50602082810151805161104c92600185019201906110f0565b50604082015180516110689160028401916020909101906110f0565b506060820151600382015560808201516004909101805460a0909301511515600160a01b0260ff60a01b196001600160a01b039093166001600160a01b0319909416939093179190911691909117905560405133907f46438e7ac889cc58e0b63ac12b567df26b87f925186ce6e46c86b519b2daeb7890610f749086908690869042906116cb565b8280546110fc9061183c565b90600052602060002090601f01602090048101928261111e5760008555611164565b82601f1061113757805160ff1916838001178555611164565b82800160010185558215611164579182015b82811115611164578251825591602001919060010190611149565b50611170929150611174565b5090565b5b808211156111705760008155600101611175565b600082601f830112611199578081fd5b813567ffffffffffffffff808211156111b4576111b4611871565b604051601f8301601f1916810160200182811182821017156111d8576111d8611871565b6040528281528483016020018610156111ef578384fd5b82602086016020830137918201602001929092529392505050565b60006020828403121561121b578081fd5b813567ffffffffffffffff811115611231578182fd5b61123d84828501611189565b949350505050565b60008060408385031215611257578081fd5b823567ffffffffffffffff8082111561126e578283fd5b61127a86838701611189565b9350602085013591508082111561128f578283fd5b5061129c85828601611189565b9150509250929050565b6000806000606084860312156112ba578081fd5b833567ffffffffffffffff808211156112d1578283fd5b6112dd87838801611189565b945060208601359150808211156112f2578283fd5b6112fe87838801611189565b93506040860135915080821115611313578283fd5b5061132086828701611189565b9150509250925092565b6000806000806080858703121561133f578081fd5b843567ffffffffffffffff80821115611356578283fd5b61136288838901611189565b95506020870135915080821115611377578283fd5b61138388838901611189565b94506040870135915080821115611398578283fd5b6113a488838901611189565b935060608701359150808211156113b9578283fd5b506113c687828801611189565b91505092959194509250565b600081518084526113ea81602086016020860161180c565b601f01601f19169290920160200192915050565b600081518352602082015160a0602085015261141d60a08501826113d2565b90506040830151848203604086015261143682826113d2565b9150506060830151848203606086015261145082826113d2565b6080948501516001600160a01b03169590940194909452509092915050565b6000825161148181846020870161180c565b9190910192915050565b81546000908190600281046001808316806114a757607f831692505b60208084108214156114c757634e487b7160e01b87526022600452602487fd5b8180156114db57600181146114ec57611518565b60ff19861689528489019650611518565b6114f58a611800565b885b868110156115105781548b8201529085019083016114f7565b505084890196505b509498975050505050505050565b60208082528251828201819052600091906040908185019080840286018301878501865b8381101561159f57603f19898403018552815160608151855288820151818a870152611578828701826113d2565b928901516001600160a01b031695890195909552509487019492509086019060010161154a565b509098975050505050505050565b6000602080830181845280855180835260408601915060408482028701019250838701855b8281101561160057603f198886030184526115ee8583516113fe565b945092850192908501906001016115d2565b5092979650505050505050565b6000602080830181845280855180835260408601915060408482028701019250838701855b8281101561160057603f1988860301845261164e8583516113fe565b94509285019290850190600101611632565b901515815260200190565b600060a0825261167e60a08301886113d2565b828103602084015261169081886113d2565b905082810360408401526116a481876113d2565b905082810360608401526116b881866113d2565b9150508260808301529695505050505050565b6000608082526116de60808301876113d2565b82810360208401526116f081876113d2565b9050828103604084015261170481866113d2565b91505082606083015295945050505050565b600060a0825261172960a08301886113d2565b828103602084015261173b81886113d2565b9050828103604084015261174f81876113d2565b606084019590955250506001600160a01b03919091166080909101529392505050565b60006060825261178560608301866113d2565b828103602084015261179781866113d2565b915050826040830152949350505050565b6020808252601290820152714c6f7420616c72656164792065786973747360701b604082015260600190565b602080825260129082015271131bdd08191bd95cc81b9bdd08195e1a5cdd60721b604082015260600190565b60009081526020902090565b60005b8381101561182757818101518382015260200161180f565b83811115611836576000848401525b50505050565b60028104600182168061185057607f821691505b6020821081141561043657634e487b7160e01b600052602260045260246000fd5b634e487b7160e01b600052604160045260246000fdfea2646970667358221220c84575edd6f6d10751bf7572c9b7b2a3ecccdaa33b80d0c876359ecbf91819de64736f6c63430008000033";

    public static final String FUNC_ADDPRODUCTLOT = "addProductLot";

    public static final String FUNC_UPDATEPROCESSSTEP = "updateProcessStep";

    public static final String FUNC_ADDLOGISTICSDATA = "addLogisticsData";

    public static final String FUNC_VERIFYPRODUCT = "verifyProduct";

    public static final String FUNC_GETPRODUCTLOT = "getProductLot";

    public static final String FUNC_GETPROCESSLOGS = "getProcessLogs";

    public static final String FUNC_GETTRANSPORTLOGS = "getTransportLogs";

    public static final String FUNC_GETVERIFICATIONS = "getVerifications";

    public static final String FUNC_VERIFYPRODUCTLOT = "verifyProductLot";

    public static final Event PROCESSUPDATED_EVENT = new Event("ProcessUpdated", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Uint256>() {}, new TypeReference<Address>(true) {}));
    ;

    public static final Event PRODUCTLOTADDED_EVENT = new Event("ProductLotAdded", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Uint256>() {}, new TypeReference<Address>(true) {}));
    ;

    public static final Event PRODUCTVERIFIED_EVENT = new Event("ProductVerified", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Uint256>() {}, new TypeReference<Address>(true) {}));
    ;

    public static final Event TRANSPORTUPDATED_EVENT = new Event("TransportUpdated", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Uint256>() {}, new TypeReference<Address>(true) {}));
    ;

    @Deprecated
    protected AgriTrace(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected AgriTrace(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected AgriTrace(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected AgriTrace(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static List<ProcessUpdatedEventResponse> getProcessUpdatedEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(PROCESSUPDATED_EVENT, transactionReceipt);
        ArrayList<ProcessUpdatedEventResponse> responses = new ArrayList<ProcessUpdatedEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            ProcessUpdatedEventResponse typedResponse = new ProcessUpdatedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.updatedBy = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.lotId = (String) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse.stepInfo = (String) eventValues.getNonIndexedValues().get(1).getValue();
            typedResponse.timestamp = (BigInteger) eventValues.getNonIndexedValues().get(2).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static ProcessUpdatedEventResponse getProcessUpdatedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(PROCESSUPDATED_EVENT, log);
        ProcessUpdatedEventResponse typedResponse = new ProcessUpdatedEventResponse();
        typedResponse.log = log;
        typedResponse.updatedBy = (String) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.lotId = (String) eventValues.getNonIndexedValues().get(0).getValue();
        typedResponse.stepInfo = (String) eventValues.getNonIndexedValues().get(1).getValue();
        typedResponse.timestamp = (BigInteger) eventValues.getNonIndexedValues().get(2).getValue();
        return typedResponse;
    }

    public Flowable<ProcessUpdatedEventResponse> processUpdatedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getProcessUpdatedEventFromLog(log));
    }

    public Flowable<ProcessUpdatedEventResponse> processUpdatedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(PROCESSUPDATED_EVENT));
        return processUpdatedEventFlowable(filter);
    }

    public static List<ProductLotAddedEventResponse> getProductLotAddedEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(PRODUCTLOTADDED_EVENT, transactionReceipt);
        ArrayList<ProductLotAddedEventResponse> responses = new ArrayList<ProductLotAddedEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            ProductLotAddedEventResponse typedResponse = new ProductLotAddedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.creator = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.lotId = (String) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse.dataHash = (String) eventValues.getNonIndexedValues().get(1).getValue();
            typedResponse.ipfsHash = (String) eventValues.getNonIndexedValues().get(2).getValue();
            typedResponse.timestamp = (BigInteger) eventValues.getNonIndexedValues().get(3).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static ProductLotAddedEventResponse getProductLotAddedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(PRODUCTLOTADDED_EVENT, log);
        ProductLotAddedEventResponse typedResponse = new ProductLotAddedEventResponse();
        typedResponse.log = log;
        typedResponse.creator = (String) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.lotId = (String) eventValues.getNonIndexedValues().get(0).getValue();
        typedResponse.dataHash = (String) eventValues.getNonIndexedValues().get(1).getValue();
        typedResponse.ipfsHash = (String) eventValues.getNonIndexedValues().get(2).getValue();
        typedResponse.timestamp = (BigInteger) eventValues.getNonIndexedValues().get(3).getValue();
        return typedResponse;
    }

    public Flowable<ProductLotAddedEventResponse> productLotAddedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getProductLotAddedEventFromLog(log));
    }

    public Flowable<ProductLotAddedEventResponse> productLotAddedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(PRODUCTLOTADDED_EVENT));
        return productLotAddedEventFlowable(filter);
    }

    public static List<ProductVerifiedEventResponse> getProductVerifiedEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(PRODUCTVERIFIED_EVENT, transactionReceipt);
        ArrayList<ProductVerifiedEventResponse> responses = new ArrayList<ProductVerifiedEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            ProductVerifiedEventResponse typedResponse = new ProductVerifiedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.verifiedBy = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.lotId = (String) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse.verifier = (String) eventValues.getNonIndexedValues().get(1).getValue();
            typedResponse.result = (String) eventValues.getNonIndexedValues().get(2).getValue();
            typedResponse.certificateIPFS = (String) eventValues.getNonIndexedValues().get(3).getValue();
            typedResponse.timestamp = (BigInteger) eventValues.getNonIndexedValues().get(4).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static ProductVerifiedEventResponse getProductVerifiedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(PRODUCTVERIFIED_EVENT, log);
        ProductVerifiedEventResponse typedResponse = new ProductVerifiedEventResponse();
        typedResponse.log = log;
        typedResponse.verifiedBy = (String) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.lotId = (String) eventValues.getNonIndexedValues().get(0).getValue();
        typedResponse.verifier = (String) eventValues.getNonIndexedValues().get(1).getValue();
        typedResponse.result = (String) eventValues.getNonIndexedValues().get(2).getValue();
        typedResponse.certificateIPFS = (String) eventValues.getNonIndexedValues().get(3).getValue();
        typedResponse.timestamp = (BigInteger) eventValues.getNonIndexedValues().get(4).getValue();
        return typedResponse;
    }

    public Flowable<ProductVerifiedEventResponse> productVerifiedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getProductVerifiedEventFromLog(log));
    }

    public Flowable<ProductVerifiedEventResponse> productVerifiedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(PRODUCTVERIFIED_EVENT));
        return productVerifiedEventFlowable(filter);
    }

    public static List<TransportUpdatedEventResponse> getTransportUpdatedEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(TRANSPORTUPDATED_EVENT, transactionReceipt);
        ArrayList<TransportUpdatedEventResponse> responses = new ArrayList<TransportUpdatedEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            TransportUpdatedEventResponse typedResponse = new TransportUpdatedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.transporter = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.lotId = (String) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse.temperature = (String) eventValues.getNonIndexedValues().get(1).getValue();
            typedResponse.humidity = (String) eventValues.getNonIndexedValues().get(2).getValue();
            typedResponse.location = (String) eventValues.getNonIndexedValues().get(3).getValue();
            typedResponse.timestamp = (BigInteger) eventValues.getNonIndexedValues().get(4).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static TransportUpdatedEventResponse getTransportUpdatedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(TRANSPORTUPDATED_EVENT, log);
        TransportUpdatedEventResponse typedResponse = new TransportUpdatedEventResponse();
        typedResponse.log = log;
        typedResponse.transporter = (String) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.lotId = (String) eventValues.getNonIndexedValues().get(0).getValue();
        typedResponse.temperature = (String) eventValues.getNonIndexedValues().get(1).getValue();
        typedResponse.humidity = (String) eventValues.getNonIndexedValues().get(2).getValue();
        typedResponse.location = (String) eventValues.getNonIndexedValues().get(3).getValue();
        typedResponse.timestamp = (BigInteger) eventValues.getNonIndexedValues().get(4).getValue();
        return typedResponse;
    }

    public Flowable<TransportUpdatedEventResponse> transportUpdatedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getTransportUpdatedEventFromLog(log));
    }

    public Flowable<TransportUpdatedEventResponse> transportUpdatedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(TRANSPORTUPDATED_EVENT));
        return transportUpdatedEventFlowable(filter);
    }

    public RemoteFunctionCall<TransactionReceipt> addProductLot(String lotId, String dataHash, String ipfsHash) {
        final Function function = new Function(
                FUNC_ADDPRODUCTLOT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(lotId), 
                new org.web3j.abi.datatypes.Utf8String(dataHash), 
                new org.web3j.abi.datatypes.Utf8String(ipfsHash)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> updateProcessStep(String lotId, String stepInfo) {
        final Function function = new Function(
                FUNC_UPDATEPROCESSSTEP, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(lotId), 
                new org.web3j.abi.datatypes.Utf8String(stepInfo)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> addLogisticsData(String lotId, String temperature, String humidity, String location) {
        final Function function = new Function(
                FUNC_ADDLOGISTICSDATA, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(lotId), 
                new org.web3j.abi.datatypes.Utf8String(temperature), 
                new org.web3j.abi.datatypes.Utf8String(humidity), 
                new org.web3j.abi.datatypes.Utf8String(location)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> verifyProduct(String lotId, String verifier, String result, String certificateIPFS) {
        final Function function = new Function(
                FUNC_VERIFYPRODUCT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(lotId), 
                new org.web3j.abi.datatypes.Utf8String(verifier), 
                new org.web3j.abi.datatypes.Utf8String(result), 
                new org.web3j.abi.datatypes.Utf8String(certificateIPFS)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Tuple5<String, String, String, BigInteger, String>> getProductLot(String lotId) {
        final Function function = new Function(FUNC_GETPRODUCTLOT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(lotId)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Uint256>() {}, new TypeReference<Address>() {}));
        return new RemoteFunctionCall<Tuple5<String, String, String, BigInteger, String>>(function,
                new Callable<Tuple5<String, String, String, BigInteger, String>>() {
                    @Override
                    public Tuple5<String, String, String, BigInteger, String> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple5<String, String, String, BigInteger, String>(
                                (String) results.get(0).getValue(), 
                                (String) results.get(1).getValue(), 
                                (String) results.get(2).getValue(), 
                                (BigInteger) results.get(3).getValue(), 
                                (String) results.get(4).getValue());
                    }
                });
    }

    public RemoteFunctionCall<List> getProcessLogs(String lotId) {
        final Function function = new Function(FUNC_GETPROCESSLOGS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(lotId)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<DynamicArray<ProcessLog>>() {}));
        return new RemoteFunctionCall<List>(function,
                new Callable<List>() {
                    @Override
                    @SuppressWarnings("unchecked")
                    public List call() throws Exception {
                        List<Type> result = (List<Type>) executeCallSingleValueReturn(function, List.class);
                        return convertToNative(result);
                    }
                });
    }

    public RemoteFunctionCall<List> getTransportLogs(String lotId) {
        final Function function = new Function(FUNC_GETTRANSPORTLOGS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(lotId)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<DynamicArray<TransportLog>>() {}));
        return new RemoteFunctionCall<List>(function,
                new Callable<List>() {
                    @Override
                    @SuppressWarnings("unchecked")
                    public List call() throws Exception {
                        List<Type> result = (List<Type>) executeCallSingleValueReturn(function, List.class);
                        return convertToNative(result);
                    }
                });
    }

    public RemoteFunctionCall<List> getVerifications(String lotId) {
        final Function function = new Function(FUNC_GETVERIFICATIONS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(lotId)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<DynamicArray<Verification>>() {}));
        return new RemoteFunctionCall<List>(function,
                new Callable<List>() {
                    @Override
                    @SuppressWarnings("unchecked")
                    public List call() throws Exception {
                        List<Type> result = (List<Type>) executeCallSingleValueReturn(function, List.class);
                        return convertToNative(result);
                    }
                });
    }

    public RemoteFunctionCall<Boolean> verifyProductLot(String lotId, String dataHash) {
        final Function function = new Function(FUNC_VERIFYPRODUCTLOT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(lotId), 
                new org.web3j.abi.datatypes.Utf8String(dataHash)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    @Deprecated
    public static AgriTrace load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new AgriTrace(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static AgriTrace load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new AgriTrace(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static AgriTrace load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new AgriTrace(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static AgriTrace load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new AgriTrace(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<AgriTrace> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(AgriTrace.class, web3j, credentials, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<AgriTrace> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(AgriTrace.class, web3j, credentials, gasPrice, gasLimit, BINARY, "");
    }

    public static RemoteCall<AgriTrace> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(AgriTrace.class, web3j, transactionManager, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<AgriTrace> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(AgriTrace.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, "");
    }

    public static class ProcessLog extends DynamicStruct {
        public BigInteger timestamp;

        public String stepInfo;

        public String updatedBy;

        public ProcessLog(BigInteger timestamp, String stepInfo, String updatedBy) {
            super(new org.web3j.abi.datatypes.generated.Uint256(timestamp), 
                    new org.web3j.abi.datatypes.Utf8String(stepInfo), 
                    new org.web3j.abi.datatypes.Address(160, updatedBy));
            this.timestamp = timestamp;
            this.stepInfo = stepInfo;
            this.updatedBy = updatedBy;
        }

        public ProcessLog(Uint256 timestamp, Utf8String stepInfo, Address updatedBy) {
            super(timestamp, stepInfo, updatedBy);
            this.timestamp = timestamp.getValue();
            this.stepInfo = stepInfo.getValue();
            this.updatedBy = updatedBy.getValue();
        }
    }

    public static class TransportLog extends DynamicStruct {
        public BigInteger timestamp;

        public String temperature;

        public String humidity;

        public String location;

        public String transporter;

        public TransportLog(BigInteger timestamp, String temperature, String humidity, String location, String transporter) {
            super(new org.web3j.abi.datatypes.generated.Uint256(timestamp), 
                    new org.web3j.abi.datatypes.Utf8String(temperature), 
                    new org.web3j.abi.datatypes.Utf8String(humidity), 
                    new org.web3j.abi.datatypes.Utf8String(location), 
                    new org.web3j.abi.datatypes.Address(160, transporter));
            this.timestamp = timestamp;
            this.temperature = temperature;
            this.humidity = humidity;
            this.location = location;
            this.transporter = transporter;
        }

        public TransportLog(Uint256 timestamp, Utf8String temperature, Utf8String humidity, Utf8String location, Address transporter) {
            super(timestamp, temperature, humidity, location, transporter);
            this.timestamp = timestamp.getValue();
            this.temperature = temperature.getValue();
            this.humidity = humidity.getValue();
            this.location = location.getValue();
            this.transporter = transporter.getValue();
        }
    }

    public static class Verification extends DynamicStruct {
        public BigInteger timestamp;

        public String verifier;

        public String result;

        public String certificateIPFS;

        public String verifiedBy;

        public Verification(BigInteger timestamp, String verifier, String result, String certificateIPFS, String verifiedBy) {
            super(new org.web3j.abi.datatypes.generated.Uint256(timestamp), 
                    new org.web3j.abi.datatypes.Utf8String(verifier), 
                    new org.web3j.abi.datatypes.Utf8String(result), 
                    new org.web3j.abi.datatypes.Utf8String(certificateIPFS), 
                    new org.web3j.abi.datatypes.Address(160, verifiedBy));
            this.timestamp = timestamp;
            this.verifier = verifier;
            this.result = result;
            this.certificateIPFS = certificateIPFS;
            this.verifiedBy = verifiedBy;
        }

        public Verification(Uint256 timestamp, Utf8String verifier, Utf8String result, Utf8String certificateIPFS, Address verifiedBy) {
            super(timestamp, verifier, result, certificateIPFS, verifiedBy);
            this.timestamp = timestamp.getValue();
            this.verifier = verifier.getValue();
            this.result = result.getValue();
            this.certificateIPFS = certificateIPFS.getValue();
            this.verifiedBy = verifiedBy.getValue();
        }
    }

    public static class ProcessUpdatedEventResponse extends BaseEventResponse {
        public String updatedBy;

        public String lotId;

        public String stepInfo;

        public BigInteger timestamp;
    }

    public static class ProductLotAddedEventResponse extends BaseEventResponse {
        public String creator;

        public String lotId;

        public String dataHash;

        public String ipfsHash;

        public BigInteger timestamp;
    }

    public static class ProductVerifiedEventResponse extends BaseEventResponse {
        public String verifiedBy;

        public String lotId;

        public String verifier;

        public String result;

        public String certificateIPFS;

        public BigInteger timestamp;
    }

    public static class TransportUpdatedEventResponse extends BaseEventResponse {
        public String transporter;

        public String lotId;

        public String temperature;

        public String humidity;

        public String location;

        public BigInteger timestamp;
    }
}
